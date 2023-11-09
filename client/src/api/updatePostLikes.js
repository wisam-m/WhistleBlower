import { backendURL } from "../backendUrl";
const url = backendURL + "posts";

const updateLikeMutation = (query, variables) => {
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

const updateQuery = (id) => `
mutation {
    updatePostLikes ( Id: "${id}") {
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
}`;

// need to change the data being inserted dynamically.
export const updatePostLikes = (id) =>
  updateLikeMutation(updateQuery(id)).then((data) => {
    const posts = data.data.Posts;
    return posts;
  });
