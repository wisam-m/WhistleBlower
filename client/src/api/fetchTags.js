// import axios from "axios";
// import { useQuery } from "react-query";
// import { GraphQLClient, gql } from "graphql-request";

import { backendURL } from "../backendUrl";
const url = backendURL + "tags";

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

export const fetchTags = (username) =>
  queryFetch(` 
{
    Tags (username: "${username}")
    {
     tag
    }
  }
`).then((data) => {
    const tags = data.data.Tags;
    return tags;
  });
