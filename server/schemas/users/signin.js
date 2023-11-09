import { GraphQLNonNull, GraphQLString } from "graphql";
import { UsersModel } from "./db.js";
import bcrypt from 'bcrypt';
import cookie from 'cookie';

export const Signin = {
  description: "Signin user with email and password",
  type: GraphQLString,
  args: {
    username: {
      description: "Username",
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      description: "Password",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_parent, { username, password }, req) => {
    const res = await signin(username, password, req, req.res);
    return res;
  },
};

async function signin(username, password, req, res) {
  if (username == null || username == "") return new Error('username is missing');
  if (password == null || password == "") return new Error('password is missing');

  const saltRounds = 10;

  // retrieve user from the database
  return new Promise((resolve, reject) => {
    UsersModel.findOne({_id: username}, function(err, user){
      if (err) return reject(err);
      if (!user) return reject(new Error('access denied'));
      bcrypt.compare(password, user.hash, function(err, valid) {
          if (err) return reject(err);
          if (!valid) return reject(new Error('access denied'));
          // start a session
          req.session.username = username;
          res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
                path : '/', 
                maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
          }));
          return resolve(username);
      });
    });
  });
}
