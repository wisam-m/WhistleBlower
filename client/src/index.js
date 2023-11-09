import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/index.js";
import App from "./App";
import Layout from "./Layout";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import GetTags from "./components/GetTags/GetTags.js";
import Credit from "./credit.js";
// import Comments from "./components/Comments/Comments.js";
// import SinglePost from "./components/SinglePost/SinglePost.js";
import SinglePost from "./SinglePost";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
localStorage.setItem("username", "");

export default function Index() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/gettags" component={GetTags} />
          <Route path="/credits.html" component={Credit} />
          <Route path="/:postId" component={SinglePost} />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
