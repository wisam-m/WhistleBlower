// import axios from "axios";
// import { useQuery } from "react-query";
// import { GraphQLClient, gql } from "graphql-request";

import { backendURL } from "../backendUrl";
const url = backendURL + "comments";

const getComments = (query, variables) => {
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

const fetchQuery = (postId, index) =>
  `{
  findTenComments (postId: "${postId}", index: 0) {
    id
    author
    postId
    content
    createdAt
    isUpdated
}
}`;

// need to change the data being inserted dynamically.
export const fetchComments = (postId, index) =>
  getComments(fetchQuery(postId, index)).then((data) => {
    const comments = data.data.findTenComments;
    return comments;
  });
