import TodoModel from "../models/TodoModel";
import { Req, Res, TodoBody } from "@/types";
import { TodoRepository } from "../repositories";
import { CreateTodo } from "../services/Todo/CreateTodo";

const todoRepository = new TodoRepository();
class TodoController {
  static async CreatTodo(req: Req<TodoBody>, res: Res) {
    try {
      const createTodoService = new CreateTodo(todoRepository);
      await createTodoService.execute(req.body);
      return res.status(201).json({ message: "Todo sucessful created" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async GetTodos(req: Req<{ userId: string }>, res: Res) {
    try {
      const { userId } = req.body;
      const { format } = req.query;

      const todos = await todoRepository.findTodosByUserId(userId);

      if (!!todos) {
        todos.forEach((_, index) => {
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

        return res.status(200).json(todosByPriority);
      }

      return res.status(200).json({ todos });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async editTodo(req: Req<TodoBody>, res: Res) {
    try {
      const {
        body,
        params: { id },
      } = req;

      await todoRepository.updateTodo({ ...body, id });

      return res.status(200).json({ message: "Todo was editaled susscefully" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async deleTodo(req: Req<{}>, res: Res) {
    try {
      const {
        params: { id },
      } = req;
      const todo = await todoRepository.deleteTodo(id);

      if (!todo) return res.status(404).json({ message: "Todo was not found" });

      return res.status(200).json({ message: "Todo was deleted susscefully" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default TodoController;
