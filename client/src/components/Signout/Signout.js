import React, { Component } from "react";
import { signoutRequest } from "./signoutRequest";
import Button from '@mui/material/Button';

class Signout extends Component {
  render() {
    return (
      <Button color="error" variant="contained" onClick={() => {
        localStorage.setItem("username", "");
        signoutRequest().then((data) => {
          if (data.errors && data.errors.length > 0) this.setState({error: data.errors[0].message});
          else this.props.history.push("/");
        })
      }}>
        Signout
      </Button>
    );
  }
}

export default Signout;