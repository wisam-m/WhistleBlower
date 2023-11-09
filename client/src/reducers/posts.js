// import {
//   FETCH_ALL,
//   CREATE,
//   UPDATE,
//   DELETE,
//   LIKE,
// } from "../constants/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "FETCH_ONE":
      return action.payload;
    case "CREATE":
      return posts;
    case "DELETE":
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case "UPDATEDISLIKES":
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case "UPDATELIKES":
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    default:
      return posts;
  }
};
