"use server";
import { connectToDatabase } from "@/lib/database/index";
import Comment from "../database/models/comment.model";
import User from "@/lib/database/models/user.model";
import Event from "../database/models/event.model";

const populateComment = (query: any) => {
  return query
    .populate({ path: "user", model: User, select: "_id firstName lastName username photo" })
    .populate({ path: "event", model: Event, select: "_id" });
};
export async function getCommentsByEventId(eventId: string) {
  try {
    await connectToDatabase();
    const comments = await populateComment(Comment.find({event: eventId}));
    if (!comments) throw new Error("Comments not found");
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    throw new Error(
      `Error while fetching comments for event ${eventId}: ${error}`
    );
  }
}

export async function createComment(
  desc: string,
  userId: string,
  eventId: string
) {
  try {
    await connectToDatabase();
    const comment = await Comment.create({
      desc,
      user: userId,
      event: eventId,
    });
    return JSON.parse(JSON.stringify(comment));;
  } catch (error) {
    throw new Error(`Error while creating comment: ${error}`);
  }
}
