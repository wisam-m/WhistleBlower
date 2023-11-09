import { TagsModel } from "./db.js";

export async function addTag(username, tag, similarity) {
    const tagModel = new TagsModel({
        username,
        tag,
        similarity
    });
    return tagModel.save();
}