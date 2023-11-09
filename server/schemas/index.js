import { PostQuery, PostMutation } from "./posts/index.js";
import { UserMutation } from "./users/index.js";
import { CommentQuery, CommentMutation } from "./comments/index.js";
import { TagsQuery } from "./users/verification/index.js";

//import { gql } from "apollo-server-express";

import { GraphQLSchema } from "graphql";
import { UserQuery } from "./users/query.js";

// Make resolver after, clean up the code.
export const postschema = new GraphQLSchema({
  query: PostQuery,
  mutation: PostMutation,
});

export const userSchema = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
});

export const commentSchema = new GraphQLSchema({
  query: CommentQuery,
  mutation: CommentMutation,
});

export const tagsSchema = new GraphQLSchema({
  query: TagsQuery,
});
