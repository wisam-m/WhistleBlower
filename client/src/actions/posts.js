import * as apiFetchPosts from "../api/fetchPosts.js";
import * as apiFetchPost from "../api/fetchPost.js";
import * as apiUpdatePostLikes from "../api/updatePostLikes.js";
import * as apiUpdatePostDislikes from "../api/updatePostDislikes.js";
import * as apiDeletePost from "../api/deletePost.js";
import * as apiCreatePost from "../api/createPost.js";

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await apiFetchPosts.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: posts });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const post = await apiFetchPost.fetchPost(id);
    dispatch({ type: "FETCH_ONE", payload: post });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePostDislike = (id) => async (dispatch) => {
  try {
    const posts = await apiUpdatePostDislikes.updatePostDislikes(id);
    dispatch({ type: "UPDATEDISLIKES", payload: posts });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePostLike = (id) => async (dispatch) => {
  try {
    const posts = await apiUpdatePostLikes.updatePostLikes(id);
    dispatch({ type: "UPDATELIKES", payload: posts });
  } catch (error) {
    console.log(error.message);
  }
};

// need to fix delete post
export const deletePost = (username, id) => async (dispatch) => {
  try {
    const posts = await apiDeletePost.removePost(username, id);
    dispatch({ type: "DELETE", payload: posts });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (username, post) => async (dispatch) => {
  try {
    const newpost = await apiCreatePost.makePost(username, post);
    dispatch({ type: "CREATE", payload: newpost });
  } catch (error) {
    console.log(error.message);
  }
};
