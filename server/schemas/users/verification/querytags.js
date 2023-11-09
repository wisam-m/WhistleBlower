import { TagsModel } from "./db.js";
import { TagsTypes } from "./types.js";
import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";

export async function addTag(username, tag, similarity) {
  const tagModel = new TagsModel({
    username,
    tag,
    similarity,
  });
  return tagModel.save();
}

export const TagsQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    Tags: {
      type: new GraphQLList(TagsTypes),
      args: {
        username: { type: GraphQLString },
      },
      resolve: (_parent, args, req) => {
        if (req.session.username == "") {
          // do nothing here
          return;
        } else {
          return TagsModel.find({ username: args.username }).exec();
        }
      },
    },
  },
});
