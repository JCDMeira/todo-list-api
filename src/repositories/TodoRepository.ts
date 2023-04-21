import TodoModel from "../models/TodoModel";
import { TodoBody, updateTodo } from "@/types";
import { ITodoRepository } from "./ITodosRepository";

export class TodoRepository implements ITodoRepository {
  async create(props: TodoBody) {
    const date = new Date().getTime();
    await TodoModel.create({
      ...props,
      created_by: props.userId,
      isCompleted: false,
      created_at: date,
      updated_at: date,
    });
  }

  async findTodosByUserId(userId: string) {
    return TodoModel.find({ created_by: userId }, { __v: 0 });
  }

  updateTodo: updateTodo = async ({ id, ...rest }) => {
    const date = new Date().getTime();
    await TodoModel.findByIdAndUpdate(id, {
      ...rest,
      updated_at: date,
    });
  };

  deleteTodo = async (id: string) => {
    return TodoModel.findByIdAndDelete(id);
  };
}
