import { TodoBody, UpdateTodoDTO } from "../types";

export interface ITodoRepository {
  create(props: TodoBody): Promise<void>;

  findTodosByUserId(userId: string): Promise<any>;

  updateTodo(props: UpdateTodoDTO): Promise<void>;

  deleteTodo(id: string): Promise<any | null>;
}
