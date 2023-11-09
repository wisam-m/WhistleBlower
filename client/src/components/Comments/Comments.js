import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import whistle from "../../uploads/whistle.jpg";
import {
  deleteComment,
  createComment,
  getComments,
} from "../../actions/comment.js";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";

const Comments = () => {
  const classes = useStyles();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  const [commentIndex] = useState(0);
  const [updateDelete, setUpdateDelete] = useState(false);
  const [commentState, setCommentState] = useState(false);

  const username = localStorage.getItem("username");
  const comments = useSelector((state) => state.comments);

  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.id === postId);

  useEffect(() => {
    dispatch(getComments(postId, commentIndex));
  }, []);

  useEffect(() => {
    if (commentState) {
      dispatch(getComments(postId, commentIndex));
      setCommentState(false);
    }
    if (updateDelete) {
      dispatch(getComments(postId, commentIndex));
      // const stateComment = useSelector((state) => state.comments);
      // setComments(stateComment);
      setUpdateDelete(false);
      console.log(comments);
    }
  }, [commentState, updateDelete]);

  const clearOnClick = () => {
    setNewComment("");
  };

  // change this getting the user from the session after.
  const deleteOnClick = (commentId) => {
    dispatch(deleteComment(username, post.author, commentId));
    setUpdateDelete(true);
  };

  const submitComment = () => {
    dispatch(createComment(username, post, newComment));
    setNewComment("");
    setCommentState(true);
  };

  return (
    <div style={{ padding: 14 }}>
      <h1>Comments</h1>
      <Paper elevation={2} style={{ padding: "40px 20px" }}>
        {comments.map((comment) => (
          <>
            <Grid container spacing={2}>
              <Grid container direction="row" item xs={12}>
                <Avatar src={whistle} />
                <Typography
                  style={{
                    marginLeft: "10px",
                    marginTop: "5px",
                    textAlign: "left",
                  }}
                  variant="h6"
                >
                  {comment.author}
                </Typography>
              </Grid>
              <Grid justifyContent="left" item xs={12}>
                <Typography
                  style={{ marginBottom: "10px", textAlign: "left" }}
                  variant="body1"
                >
                  {comment.content}
                  <></>
                </Typography>
                <Typography variant="h7" color="textSecondary">
                  Posted at {moment(parseInt(comment.createdAt)).fromNow()}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => deleteOnClick(comment.id)}
                >
                  <DeleteIcon fontSize="small" />
                  Delete
                </Button>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </Grid>
          </>
        ))}
        {username === "" ? null : (
          <>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <Grid item>
              <TextField
                id="outlined-multiline-static"
                multiline
                minRows={3}
                variant="outlined"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                className={classes.textField}
                placeholder="Leave a comment...."
                fullWidth
              />
              <Grid container justify="flex-end" style={{ margin: "5px 0" }}>
                <Button
                  variant="contained"
                  style={{ margin: "0 5px" }}
                  onClick={clearOnClick}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={submitComment}>
                  Comment
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </div>
  );
};

export default Comments;
