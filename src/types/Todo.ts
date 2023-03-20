import { Types } from "mongoose";
import { TodoBody } from "./TodoBody";

export type Todo = {
  _id: Types.ObjectId;
  isCompleted: boolean;
  created_at: number;
  updated_at: number;
  __v?: any;
} & TodoBody;

export type FormatType = "" | "priority";

export type TodosByPriority = {
  draft: string[];
  to_do: string[];
  when_you_give: string[];
  as_soon: string[];
  as_soon_as_possible: string[];
};
