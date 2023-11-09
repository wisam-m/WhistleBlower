import { GraphQLString, GraphQLObjectType } from "graphql";

export const TagsTypes = new GraphQLObjectType({
  name: "Tags",
  fields: {
    username: { type: GraphQLString },
    tag: { type: GraphQLString },
    similarity: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
});
