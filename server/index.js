import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import {
  postschema,
  userSchema,
  commentSchema,
  tagsSchema,
} from "./schemas/index.js";
import session from "express-session";
import cookie from "cookie";
import http from "http";

const app = express();
app.set('trust proxy', 1); // trust first proxy
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors({
  origin : "http://localhost:3000",
  credentials: true,
}));

app.use(session({
    proxy: true, // NODE_ENV === 'production'
    cookie: {
      secure: true,
      httpOnly: true,
    },
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next){
  req.username = (req.session.username)? req.session.username : null;
  res.setHeader('Set-Cookie', cookie.serialize('username', req.username, {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
  }));
  console.log("HTTP request", req.username, req.method, req.url);
  next();
});

// using graphql
app.use(
  "/graphql/posts",
  graphqlHTTP({
    schema: postschema,
    graphiql: true,
  })
);

app.use(
  "/graphql/users",
  graphqlHTTP({
    schema: userSchema,
    graphiql: true,
  })
);

app.use(
  "/graphql/comments",
  graphqlHTTP({
    schema: commentSchema,
    graphiql: true,
  })
);

app.use(
  "/graphql/tags",
  graphqlHTTP({
    schema: tagsSchema,
    graphiql: true,
  })
);

const CONNECTION_URL =
  "mongodb+srv://admin:fPubEEcClLYq1CO4@cluster0.0afho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const options = {};
    http.createServer(app).listen(8080);
  })
  .catch((err) => console.log(err.message));
