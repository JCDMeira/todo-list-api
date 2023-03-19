import { Types } from "mongoose";
import { TodoBody } from "./TodoBody";

export type Todo = {
  _id: Types.ObjectId;
  isCompleted: boolean;
  created_at: number;
  updated_at: number;
} & TodoBody;
