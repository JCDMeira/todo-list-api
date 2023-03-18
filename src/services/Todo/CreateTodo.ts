import { ITodoRepository } from "@/repositories/ITodosRepository";
import { TodoBody } from "@/types";

export class CreateTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(props: TodoBody) {
    if (
      props?.priority !== undefined &&
      (props?.priority > 4 || props?.priority < 0)
    )
      throw new Error("Invalid format");

    await this.todoRepository.create(props);
  }
}
