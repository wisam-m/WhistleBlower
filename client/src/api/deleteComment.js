import { backendURL } from "../backendUrl";
const url = backendURL + "comments";

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
const updateQuery = (username, author, comment) => `
    mutation {
        deleteComment( username: "${username}", author: "${author}", commentId: "${comment}") {
          author
          postId
          content
          createdAt
          isUpdated
        }
      }
`;

// need to change the data being inserted dynamically.
export const removeComment = (username, author, comment) =>
  deleteMutation(updateQuery(username, author, comment)).then((data) => {
    const comments = data.data.deleteComment;
    return comments;
  });
