import { backendURL } from "../backendUrl";
const url = backendURL + "comments";

const putComment = (query, variables) => {
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

const updateQuery = (username, post, comment) => `
mutation{
    updateComment(author :"${username}", postId: "${post.id}", content: "${comment.id}") {
      author
      postId
      content
      createdAt
      isUpdated
    }
  }`;

// need to change the data being inserted dynamically.
export const updateComment = (username, post, comment) =>
  putComment(updateQuery(username, post, comment)).then((data) => {
    const comments = data.data.Comments;
    return comments;
  });
