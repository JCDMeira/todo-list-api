import { TodoBody, UpdateTodoDTO } from "../types";

export interface ITodoRepository {
  create(props: TodoBody): void;

  findTodosByUserId(userId: string): Promise<any>;

  updateTodo(props: UpdateTodoDTO): Promise<void>;

  deleteTodo(id: string): Promise<any | null>;
}
