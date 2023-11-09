import { combineReducers } from "redux";

import posts from "./posts";
import comments from "./comment";
import tags from "./tags";

export const reducers = combineReducers({ posts, comments, tags });
