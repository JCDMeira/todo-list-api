import { TodoBody } from "./TodoBody";

export type UpdateTodoDTO = {
  id: string;
} & TodoBody;

export type updateTodo = (props: UpdateTodoDTO) => Promise<void>;
export type UpdateTodoProps = { id: string } & TodoBody;
