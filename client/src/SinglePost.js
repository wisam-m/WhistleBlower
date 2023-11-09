import React from "react";
import { Grid } from "@material-ui/core";
// import useStyles from "./styles";
import SinglePost from "./components/SinglePost/SinglePost.js";
import Comments from "./components/Comments/Comments.js";

const SinglePostPage = () => {
  // This is the style classes assign
  // Frontend checking validation for username, password.

  return (
    <Grid>
      <Grid>
        <SinglePost />
      </Grid>
      <Grid>
        <Comments />
      </Grid>
    </Grid>
  );
};

export default SinglePostPage;
