import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
} from "graphql";

export const PostTypes = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    message: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    files: { type: GraphQLString },
    numLikes: { type: GraphQLInt },
    numDislikes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  },
});
