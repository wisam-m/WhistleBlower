import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../../actions/posts";
import { getTags } from "../../actions/tags";

const Form = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [postState, setPostState] = useState(false);
  const username = localStorage.getItem("username");
  const fetchedTags = useSelector((state) => state.tags);
  const tags = Array.from(new Set(fetchedTags.map((tag) => tag.tag)));

  // make the empty data for now, meaning the empty set.
  // change tags to a list after we are done the following.
  const [postData, setPostData] = useState({
    author: "",
    title: "",
    message: "",
    tags: "",
    files: "",
  });

  useEffect(() => {
    dispatch(getTags(username));
    if (postState) {
      dispatch(getPosts());
      setPostState(false);
    }
  }, [postState]);

  const submitPost = (e) => {
    // fill this in after.
    e.preventDefault();
    dispatch(createPost(username, postData));
    setPostData({ author: "", title: "", message: "", tags: "", files: "" });
    setPostState(true);
  };

  const handleChange = (event) => {
    setPostData({ ...postData, tags: event.target.value });
  };

  // paper is a div that have white background
  // typography is text related div
  // ... postdata meaning it only changes a specific field, and onChange is triggered.
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={submitPost}
      >
        <Typography variant="h6">Submit a story</Typography>
        <TextField
          name="title"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          maxRows={6}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        {tags.length !== 0 ? (
          <FormControl variant="standard" style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">Tags</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={postData.tags}
              onChange={handleChange}
              label="Tags"
            >
              {tags.map((tag) => (
                <MenuItem value={tag}>{tag}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        {/* <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, files: base64 })}
          />
        </div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
