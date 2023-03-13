import TodoModel from "../models/TodoModel";
import { TodoBody } from "@/types";

export class TodoRepository {
  async create(props: TodoBody) {
    const date = new Date().getTime();
    await TodoModel.create({
      ...props,
      isCompleted: false,
      created_at: date,
      updated_at: date,
    });
  }
}
