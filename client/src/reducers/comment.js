export default (comments = [], action) => {
  switch (action.type) {
    case "FETCH_TEN_COMMENTS":
      return action.payload;
    case "CREATECOMMENT":
      return comments;
    case "DELETECOMMENT":
      return comments.filter((comment) => comment.id !== action.payload.id);
    case "UPDATED":
      return comments.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment
      );
    default:
      return comments;
  }
};
