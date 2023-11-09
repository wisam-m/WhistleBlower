import * as apiFetchTags from "../api/fetchTags.js";

export const getTags = (username) => async (dispatch) => {
  try {
    const tags = await apiFetchTags.fetchTags(username);
    dispatch({ type: "FETCH_TAGS", payload: tags });
  } catch (error) {
    console.log(error.message);
  }
};
