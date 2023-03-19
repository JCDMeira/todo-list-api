import { ITodoRepository } from "../../repositories/ITodosRepository";

export class GetTodos {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(userId: string, format: any) {
    const todos: any[] = await this.todoRepository.findTodosByUserId(userId);

    if (!!todos) {
      todos.forEach((_: any, index: number) => {
        todos[index].__v = undefined;
      });
    }

    if (format === "priority") {
      const todosByPriority = todos.reduce<any>(
        (acc, todo) => {
          switch (todo.priority) {
            case 0:
              return { ...acc, draft: [...acc.draft, todo] };
            case 1:
              return { ...acc, to_do: [...acc.to_do, todo] };
            case 2:
              return { ...acc, when_you_give: [...acc.when_you_give, todo] };
            case 3:
              return { ...acc, as_soon: [...acc.as_soon, todo] };
            case 4:
              return {
                ...acc,
                as_soon_as_possible: [...acc.as_soon_as_possible, todo],
              };
            default:
              throw new Error("Internal error");
          }
        },
        {
          draft: [],
          to_do: [],
          when_you_give: [],
          as_soon: [],
          as_soon_as_possible: [],
        }
      );

      return todosByPriority;
    }
    return todos;
  }
}
