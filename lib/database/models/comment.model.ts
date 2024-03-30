import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  desc: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };
  eventId: string;
  createdAt: Date;
}

const CommentSchema = new Schema({
  desc: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
