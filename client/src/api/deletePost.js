import { backendURL } from "../backendUrl";
const url = backendURL + "posts";

const deleteMutation = (query, variables) => {
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

// Fix query when done,
const updateQuery = (username, id) => `
mutation {
    DeletePost(username:"${username}", Id: "${id}") {
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
export const removePost = (username, id) =>
  deleteMutation(updateQuery(username, id)).then((data) => {
    const posts = data.data.Posts;
    return posts;
  });
