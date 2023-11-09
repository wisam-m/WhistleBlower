import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";
// import useStyles from "./styles";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { getPosts } from "./actions/posts.js";
// import { useCookies } from "react-cookie";

const App = () => {
  // This is the style classes assign
  // Frontend checking validation for username, password.

  // Need a handle submit form

  // const classes = useStyles();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dispatch(getPosts());
  }, [posts, dispatch]);

  console.log(localStorage.getItem("username"));

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {localStorage.getItem("username") === "" ? null : (
              <Grid item xs={12} sm={12}>
                <Form />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <Posts setPosts={setPosts} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <footer style={{ display: "flex", alignItems: "center" }}>
        <a href="/credits.html">credits</a>
      </footer>
    </Container>
  );
};

export default App;
