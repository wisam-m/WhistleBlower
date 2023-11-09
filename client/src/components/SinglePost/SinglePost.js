import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import {
  updatePostDislike,
  updatePostLike,
  deletePost,
  getPosts,
} from "../../actions/posts.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import whistle from "../../uploads/whistle.jpg";
import useStyles from "./styles";

const SinglePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [updateSingleDislikes, setUpdateSingleDislikes] = useState(false);
  const [updateLikes, setUpdateLikes] = useState(false);
  const [updateDelete, setUpdateDelete] = useState(false);
  const username = localStorage.getItem("username");

  const { postId } = useParams();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (updateSingleDislikes) {
      dispatch(getPosts());
      setUpdateSingleDislikes(false);
    }
    if (updateLikes) {
      dispatch(getPosts());
      setUpdateLikes(false);
    }
    if (updateDelete) {
      dispatch(getPosts());
      setUpdateDelete(false);
      history.push("/");
    }
  }, [updateDelete, updateLikes, updateSingleDislikes]);

  if (posts.length === 0) {
    return "Loading....";
  }
  const post = posts.find((post) => post.id === postId);

  const dislikeOnClick = () => {
    dispatch(updatePostDislike(post.id));
    setUpdateSingleDislikes(true);
  };

  const likeOnClick = () => {
    dispatch(updatePostLike(post.id));
    setUpdateLikes(true);
  };

  const deleteOnClick = () => {
    dispatch(deletePost(username, post.id));
    setUpdateDelete(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "90%", md: "80%" } }}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={whistle}
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.author}</Typography>
            <Typography variant="h6">
              {moment(parseInt(post.createdAt)).fromNow()}
            </Typography>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              onClick={() => likeOnClick(post.id)}
            >
              <ThumbUpAltIcon fontSize="small" />
              Like {post.numLikes}
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => dislikeOnClick(post.id)}
            >
              <ThumbDownAltIcon fontSize="small" />
              Dislike {post.numDislikes}
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => deleteOnClick(post.id)}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default SinglePost;
