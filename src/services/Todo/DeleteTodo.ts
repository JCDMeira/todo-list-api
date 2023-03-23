import { ITodoRepository } from "@/repositories/ITodosRepository";

export class DeleteTodo {
  constructor(private todoRepository: ITodoRepository) {}
  async execute(id: string) {
    const todo = await this.todoRepository.deleteTodo(id);

    if (!todo) throw new Error("Todo was not found");
  }
}
