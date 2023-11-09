import { GraphQLNonNull, GraphQLString } from "graphql";
import AWS from 'aws-sdk';
import { getLogo } from "./identify.js";
import shortId from "shortid";
import fs from 'fs';
import UPLOAD_DIRECTORY_URL from "./UPLOAD_DIRECTORY_URL.mjs";
import { deleteFile } from "./deleteFile.js";
import { addTag } from "./addtag.js";

export const Verify = {
  description: "Verify that the person is the same in two images and send logo if match",
  type: GraphQLString,
  args: {
    username: {
      description: "Username",
      type: new GraphQLNonNull(GraphQLString),
    },
    file1: {
      description: "Base64 Image 1",
      type: new GraphQLNonNull(GraphQLString),
    },
    file2: {
      description: "Base64 Image 2",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (parent, { file1, file2, username }, req) => {
    const res = await compareFaces(file1, file2, username);
    return res;
  },
};

async function getBuffers(image1, image2) {
  image1 = image1.replace("data:image/jpeg;base64,", "");
  const storedFileName1 = `${shortId.generate()}-logoimg.jpeg`;
  const storedFileUrl1 = new URL(storedFileName1, UPLOAD_DIRECTORY_URL);

  fs.writeFile(storedFileUrl1, image1, 'base64', function(err) {
    if (err) console.log(err);
  });

  image2 = image2.replace("data:image/jpeg;base64,", "");
  const storedFileName2 = `${shortId.generate()}-logoimg.jpeg`;
  const storedFileUrl2 = new URL(storedFileName2, UPLOAD_DIRECTORY_URL);

  const fsPromises = fs.promises; 

  return fsPromises.writeFile(storedFileUrl2, image2, 'base64')
  .then(() => {
    const bitmap1 = fs.readFileSync(storedFileUrl1.pathname);
    const buffer1 = new Buffer.from(bitmap1, 'base64');
    const bitmap2 = fs.readFileSync(storedFileUrl2.pathname);
    const buffer2 = new Buffer.from(bitmap2, 'base64');
    return [buffer1, buffer2, storedFileUrl1.pathname, storedFileUrl2.pathname];
  })
  .catch((err) => console.log(err));
}

async function compareFaces(image1, image2, username) {
  if (!username) return new Error("User not signed in!");

  let buffers = null;
  await getBuffers(image1, image2)
  .then((buf) => {
    buffers = buf;
  });
  
  //Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  //PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)
  AWS.config.update({region:'us-east-1'});
  const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  const client = new AWS.Rekognition();
  const params = {
    "SourceImage": {
        "Bytes": buffers[0]
    },
    "TargetImage": {
        "Bytes": buffers[1]
    },
    "SimilarityThreshold": 0
  };
  const response = await client.compareFaces(params).promise();

  deleteFile(buffers[2]);
  deleteFile(buffers[3]);

  let error = null;

  if (response.FaceMatches.length >= 1) {
    let logo = null;
    let similarity = response.FaceMatches[0].Similarity;
    await getLogo(image1).then(data => {
      logo = data;
    }).catch((err) => {
      error = err;
    });
    if (similarity < 75) {
      return new Error("Not enough similarity: "+ Math.round(similarity) + "%");
    }
    addTag(username, logo, similarity)
    .catch((err) => {
      error = err;
    });
    return Math.round(similarity);
  }
  if (error) return error;
  return new Error("No matching faces!");
}