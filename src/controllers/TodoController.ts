import { DeleteTodo } from "@/services/Todo/DeleteTodo";
import { FormatType, Req, Res, TodoBody } from "@/types";
import { TodoRepository } from "../repositories";
import { CreateTodo, GetTodos, UpdateTodo } from "../services/";

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
      const format = req.query.format as FormatType;

      const getTodosService = new GetTodos(todoRepository);
      const todos = await getTodosService.execute(userId, format);

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

      const updateTodoService = new UpdateTodo(todoRepository);
      updateTodoService.execute({ ...body, id });

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
      const DeleteTodoService = new DeleteTodo(todoRepository);
      const todo = await DeleteTodoService.execute(id);
      if (!todo) return res.status(404).json({ message: "Todo was not found" });

      return res.status(200).json({ message: "Todo was deleted susscefully" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default TodoController;
