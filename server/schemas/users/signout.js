import { GraphQLString } from "graphql";

export const Signout = {
  description: "Signout user",
  type: GraphQLString,
  resolve: async (_parent, _, req) => {
    req.session.destroy();
    req.res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    req.username = null;
  },
};