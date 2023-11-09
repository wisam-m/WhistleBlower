import React, { Component } from "react";
import { signupRequest } from "./signupRequest";
import { withRouter } from "react-router-dom";
import {Button, TextField, Avatar, Grid, Paper, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const signUpStyle = { padding: 20, height: '45vh', width: 280, margin: "20px auto" };
const lockStyle = {backgroundColor: 'Red'};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._handlePassFieldChange = this._handlePassFieldChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  _handleTextFieldChange(e) {
    this.setState({
        email: e.target.value
    });
  }

  _handlePassFieldChange(e) {
    this.setState({
        password: e.target.value
    });
  }

  // source: https://www.youtube.com/watch?v=L2RnP5vhbdg
  render() {
    return (
      <Grid>
        <Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          signupRequest(this.state.email, this.state.password).then((data) => {
            if (data.errors && data.errors.length > 0) this.setState({error: data.errors[0].message});
            else {
              localStorage.setItem("username", data.data.Signup);
              this.props.history.push("/");
            }
          })
        }} >
          <Paper elevation={10} style={signUpStyle}>
          <Grid align='center'>
          <Avatar style={lockStyle}><LockOpenIcon/></Avatar>
          <label>
            <h2>Signup</h2>
          </label>
          <br />
          <label>
              <TextField
              label="Username" 
              placeholder="Enter Username" 
              fullWidth type="text"
              value={this.state.email}
              onChange={this._handleTextFieldChange} />
            </label>
            <br />
            <br />
            <label>
            <TextField 
              label="Password" 
              placeholder="Enter Password" 
              fullWidth type="password"
              value={this.state.password} 
              onChange={this._handlePassFieldChange} />
            </label>
        <br />
        <br />
        <Button type="submit" variant="contained" color="error" className="btn btn-primary btn-block" fullWidth>
          Sign Up
        </Button>
        {this.state.error != null && <Typography style={{color: 'red'}}>{this.state.error}</Typography>}
        <br />
        <br />
        </Grid>
        </Paper>
      </form>
      </Typography>
      </Grid>
    );
  }
}

export default withRouter(SignUp);