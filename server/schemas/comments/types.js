import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
} from "graphql";

export const CommentTypes = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    postId: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    isUpdated: { type: GraphQLBoolean },
  },
});
