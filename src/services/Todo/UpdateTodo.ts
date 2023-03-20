import { ITodoRepository } from "@/repositories/ITodosRepository";
import { UpdateTodoProps } from "@/types";

export class UpdateTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute({ id, ...rest }: UpdateTodoProps) {
    await this.todoRepository.updateTodo({ ...rest, id });
  }
}
