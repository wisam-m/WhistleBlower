// import axios from "axios";
// import { useQuery } from "react-query";
// import { GraphQLClient, gql } from "graphql-request";

import { backendURL } from "../backendUrl";
const url = backendURL + "posts";

const queryFetch = (query, variables) => {
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => {
    const data = res.json();
    return data;
  });
};

export const fetchPost = (id) =>
  queryFetch(`
{
    Post (id : "${id}") {
        id
        title
        message
        author
        tags
        files
        numLikes
        numDislikes
        createdAt
    }
  }
`).then((data) => {
    const post = data.data.Post;
    return post;
  });
