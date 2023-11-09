import { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLBoolean } from "graphql";

export const UserQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    isSignedIn: {
      type: GraphQLBoolean,
      resolve: () => {
        return true;
      },
    },
  },
});
