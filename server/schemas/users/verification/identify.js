import { GraphQLNonNull, GraphQLString } from "graphql";
import vision from '@google-cloud/vision';
import UPLOAD_DIRECTORY_URL from "./UPLOAD_DIRECTORY_URL.mjs";
import { deleteFile } from "./deleteFile.js";
import shortId from "shortid";
import fs from 'fs';

export const Identify = {
  description: "Identify logo in image",
  type: GraphQLString,
  args: {
    file: {
      description: "Base64 Image",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (parent, { file }) => {
    const res = await getLogo(file);
    return res;
  },
};

export async function getLogo(base64) {
  base64 = base64.replace("data:image/jpeg;base64,", "");
  const storedFileName = `${shortId.generate()}-logoimg.png`;
  const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

  fs.writeFile(storedFileUrl, base64, 'base64', function(err) {
    if (err) console.log(err);
  });

  // source: https://cloud.google.com/vision/docs/detecting-logos

  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.logoDetection(storedFileUrl.pathname);

  const logos = result.logoAnnotations;

  deleteFile(storedFileUrl.pathname);

  if (logos.length >= 1) {
    return logos[0].description;
  }
  return new Error("Cannot identify any logos");
}