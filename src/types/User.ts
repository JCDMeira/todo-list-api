import { Types } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  created_at: number;
  updated_at: number;
};
