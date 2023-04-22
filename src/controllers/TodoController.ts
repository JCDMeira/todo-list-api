import { FormatType, Req, Res, TodoBody } from "@/types";
import { TodoRepository } from "../repositories";
import { CreateTodo, GetTodos, UpdateTodo, DeleteTodo } from "../services/";

const todoRepository = new TodoRepository();
class TodoController {
  static async CreateTodo(req: Req<TodoBody>, res: Res) {
    try {
      const createTodoService = new CreateTodo(todoRepository);
      const _id = await createTodoService.execute(req.body);
      return res.status(201).json({ message: "Todo sucessful created", _id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return res.status(400).json({ message });
      }
      return res.status(500).json({ message: "Unknown error" });
    }
  }

  static async GetTodos(req: Req<{ userId: string }>, res: Res) {
    try {
      const { userId } = req.body;
      const format = req.query.format as FormatType;

      const getTodosService = new GetTodos(todoRepository);
      const todos = await getTodosService.execute(userId, format);

      return res.status(200).json(todos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return res.status(400).json({ message });
      }
      return res.status(500).json({ message: "Unknown error" });
    }
  }

  static async editTodo(req: Req<TodoBody>, res: Res) {
    try {
      const {
        body,
        params: { id },
      } = req;

      const updateTodoService = new UpdateTodo(todoRepository);
      updateTodoService.execute({ ...body, id });

      return res.status(200).json({ message: "Todo was editaled susscefully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return res.status(400).json({ message });
      }
      return res.status(500).json({ message: "Unknown error" });
    }
  }

  static async deleTodo(req: Req<{}>, res: Res) {
    try {
      const {
        params: { id },
      } = req;
      const DeleteTodoService = new DeleteTodo(todoRepository);
      await DeleteTodoService.execute(id);

      return res.status(200).json({ message: "Todo was deleted susscefully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return res.status(400).json({ message });
      }
      return res.status(500).json({ message: "Unknown error" });
    }
  }
}

export default TodoController;
