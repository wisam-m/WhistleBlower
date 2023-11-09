import { GraphQLNonNull, GraphQLString } from "graphql";
import { UsersModel } from "./db.js";
import bcrypt from 'bcrypt';
import cookie from 'cookie';

export const Signup = {
  description: "Signup user with email and password",
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
    try {
      const res = await signup(username, password, req, req.res);
      return res;
    } catch (err) {
      return err;
    }
  },
};

async function signup(username, password, req, res) {
  if (username == null || username == "") return new Error('username is missing');
  if (password == null || password == "") return new Error('password is missing');

  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    UsersModel.findOne({_id: username}, function(err, user){
      if (err) return reject(err);
      if (user) return reject(new Error("username " + username + " already exists"));
      // generate a new salt and hash
      bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
              // insert new user into the database
              UsersModel.updateOne({_id: username},{_id: username, hash: hash}, {upsert: true}, function(err){
                if (err) return reject(err);
                // start a session
                req.session.username = username;
                // initialize cookie
                res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7
                }));
                return resolve(username);
              });
          });
      });
    });
  });
}
