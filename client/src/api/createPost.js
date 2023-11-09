import { backendURL } from "../backendUrl";
const url = backendURL + "posts";

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

const query = (username, post) => `
mutation {
  addPost( 
    username: "${username}",
    title: "${post.title}",
    message: "${post.message}",
     author: "",
     tags: ["${post.tags.toString().replaceAll(",", '","')}"],
     files: "${post.files}",
     )
   {
    title
     message 
     author 
     tags 
     files 
     numLikes
     numDislikes
   }
 }
`;

// need to change the data being inserted dynamically.
export const makePost = (username, post) =>
  createMutation(query(username, post)).then((data) => {
    const posts = data.data.Posts;
    return posts;
  });
