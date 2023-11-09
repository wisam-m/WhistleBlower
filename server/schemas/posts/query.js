import { PostModel } from "./db.js";
import { PostTypes } from "./types.js";
import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";

export const PostQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    Posts: {
      type: new GraphQLList(PostTypes),
      resolve: (root, args, context, info) => {
        return PostModel.find().sort({ createdAt: -1 }).limit(10).exec();
      },
    },
    // continue queries here.
    Post: {
      type: PostTypes,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        return PostModel.findById(args.id).exec();
      },
    },
  },
});
