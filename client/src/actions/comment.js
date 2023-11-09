import * as apiCreateComment from "../api/createComment.js";
import * as apiFetchComments from "../api/fetchComments.js";
import * as apiUpdateComments from "../api/updateComment.js";
import * as apiDeleteComment from "../api/deleteComment.js";

export const getComments = (postId, index) => async (dispatch) => {
  try {
    const comments = await apiFetchComments.fetchComments(postId, index);
    dispatch({ type: "FETCH_TEN_COMMENTS", payload: comments });
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = (username, post, Comment) => async (dispatch) => {
  try {
    const comment = await apiCreateComment.makeComment(username, post, Comment);
    dispatch({ type: "CREATECOMMENT", payload: comment });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateComment = (username, post, comment) => async (dispatch) => {
  try {
    const updateComment = await apiUpdateComments.updateComment(
      username,
      post,
      comment
    );
    dispatch({ type: "UPDATED", payload: updateComment });
  } catch (error) {
    console.log(error.message);
  }
};

// need to fix delete post
export const deleteComment =
  (username, author, commentId) => async (dispatch) => {
    try {
      const comment = await apiDeleteComment.removeComment(
        username,
        author,
        commentId
      );
      console.log(comment);
      dispatch({ type: "DELETECOMMENT", payload: comment });
    } catch (error) {
      console.log(error.message);
    }
  };
