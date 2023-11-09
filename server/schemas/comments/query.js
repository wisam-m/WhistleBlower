import { CommentModel } from "./db.js";
import { CommentTypes } from "./types.js";
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} from "graphql";

export const CommentQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Find all comments with the post id
    findAllComments: {
      type: new GraphQLList(CommentTypes),
      args: {
        postId: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        return CommentModel.find({ postId: args.postId }).exec();
      },
    },
    // find only one comment with specific comment id
    Comment: {
      type: new GraphQLList(CommentTypes),
      args: {
        postId: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        return CommentModel.findById(args.id).exec();
      },
    },
    findTenComments: {
      type: new GraphQLList(CommentTypes),
      args: {
        postId: { type: GraphQLString },
        index: { type: GraphQLInt },
      },
      resolve: (root, args, context, info) => {
        console.log(args.postId);
        return CommentModel.find({ postId: args.postId }).limit(10).exec();
      },
    },
  },
});
