import { TodoBody, UpdateTodoDTO } from "../types";
import { Todo } from "@/types/Todo";

export interface ITodoRepository {
  create(props: TodoBody): Promise<any>;

  findTodosByUserId(userId: string): Promise<any>;

  updateTodo(props: UpdateTodoDTO): Promise<void>;

  deleteTodo(id: string): Promise<any | null>;
}
