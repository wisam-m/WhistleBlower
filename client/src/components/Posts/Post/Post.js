import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";
import moment from "moment";
import { Link as NavLink } from "react-router-dom";
import whistle from "../../../uploads/whistle.jpg";
import useStyles from "./styles";

// post getting the post form the server and displaying it here as the post cards.
// have a default image for CardMedia.

const Post = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <NavLink
        to={{ pathname: `/${post.id}` }}
        style={{ textDecoration: "none" }}
      >
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
      </NavLink>
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
      <CardActions className={classes.cardActions}></CardActions>
    </Card>
  );
};

export default Post;
