import { CommentModel } from "./db.js";
import { CommentTypes } from "./types.js";
import { GraphQLString, GraphQLObjectType } from "graphql";

// need to generate bycrpt, and generate salt for secure password
// need to do something about session (More on the backend side).
// authentication, for user on the backend not the mutation part.
// check if the user already exist, return appropriate error codes such as 400, 500 or 200 status code.

export const CommentMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addComment: {
      type: CommentTypes,
      args: {
        username: { type: GraphQLString },
        author: { type: GraphQLString },
        postId: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve: (_parent, args, req) => {
        // args.author = req.session.username;
        args.author = args.username;
        var comment = new CommentModel(args);
        return comment.save();
      },
    },
    //graphql fetch is not waiting for the call to be finish before fetching.
    updateComment: {
      type: CommentTypes,
      args: {
        author: { type: GraphQLString },
        postId: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve: async (root, args, context, info) => {
        //check if author is the same for updating user,
        var comment = await CommentModel.findOne({
          postId: args.postId,
        }).exec();
        if (comment.author == args.author) {
          // var newComment = new CommentModel(args);
          return CommentModel.updateOne(
            { author: args.author },
            { content: args.content, isUpdated: true }
          );
        } else {
          return new Error("Authentication Error");
        }
      },
    },
    deleteComment: {
      type: CommentTypes,
      args: {
        username: { type: GraphQLString },
        author: { type: GraphQLString },
        commentId: { type: GraphQLString },
      },
      resolve: async (_parent, args, req) => {
        //check if author is the same for updating user,
        // var comment = await CommentModel.findOne({
        //   id: args.commentId,
        // }).exec();
        return CommentModel.findByIdAndRemove(args.commentId);
      },
    },
  },
});
