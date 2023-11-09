import { backendURL } from "../backendUrl";
const url = backendURL + "comments";

const createMutation = (query, variables) => {
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

const query = (username, post, comment) => `
mutation {
    addComment(username:"${username}", author: "${username}", postId: "${post.id}", content: "${comment}") {
      author
      postId
      content
      createdAt
    }
  }
`;

// need to change the data being inserted dynamically.
export const makeComment = (username, post, comment) =>
  createMutation(query(username, post, comment)).then((data) => {
    const comment = data.data.comments;
    return comment;
  });
