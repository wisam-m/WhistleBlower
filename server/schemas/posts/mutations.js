import { PostModel } from "./db.js";
import { PostTypes } from "./types.js";
import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import fs from "fs";

export const PostMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostTypes,
      args: {
        username: { type: GraphQLString },
        title: { type: GraphQLString },
        message: { type: GraphQLString },
        author: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        files: { type: GraphQLString },
        numLikes: { type: GraphQLInt },
        numDislikes: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
      },
      resolve: (_parent, args, req) => {
        if (args.username == "") {
          return new Error("Please log in to post");
        } else {
          args.author = args.username;
          var post = new PostModel(args);
          return post.save();
        }
      },
    },
    updatePostLikes: {
      type: PostTypes,
      args: {
        Id: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        // If the post with the id exist and can be found or not.
        return PostModel.findByIdAndUpdate(args.Id, {
          $inc: { numLikes: 1 },
        });
      },
    },
    updatePostDislikes: {
      type: PostTypes,
      args: {
        Id: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        // If the post with the id exist and can be found or not.
        return PostModel.findByIdAndUpdate(args.Id, {
          $inc: { numDislikes: 1 },
        });
      },
    },
    DeletePost: {
      type: PostTypes,
      args: {
        username: { type: GraphQLString },
        Id: { type: GraphQLString },
      },
      resolve: async (_parent, args, req) => {
        // If the post with the id exist and can be found or not.
        // Check user validation if the user is the owner of the id.
        var post = await PostModel.findById(args.Id);
        if (post.author == args.username) {
          return PostModel.findByIdAndRemove(args.Id);
        } else {
          return new Error("Authentication Error");
        }
      },
    },
  },
});
