import { GraphQLObjectType } from "graphql";
import { Signup } from "./signup.js";
import { Signin } from "./signin.js";
import { Signout } from "./signout.js";
import { Identify } from "./verification/identify.js";
import { Verify } from "./verification/verify.js";

export const UserMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    Signup,
    Signin,
    Signout,
    Identify,
    Verify
  }),
});