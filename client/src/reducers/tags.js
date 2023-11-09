export default (tags = [], action) => {
  switch (action.type) {
    case "FETCH_TAGS":
      return action.payload;
    default:
      return tags;
  }
};
