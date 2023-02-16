import TodoModel from "../models/TodoModel";
import { Req, Res } from "../types";

class TodoController {
  static async CreatTodo(req: Req<any>, res: Res) {
    try {
      if (req.body?.priority > 4)
        return res.status(400).json({ message: "Invalid format" });

      const date = new Date().getTime();
      const todo = await TodoModel.create({
        ...req.body,
        created_at: date,
        updated_at: date,
      });

      todo.__v = undefined;

      return res.status(201).json({ message: "Todo sucessful created", todo });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async GetTodos(req: Req<any>, res: Res) {
    try {
      const { userId } = req.body;
      const todos = await TodoModel.find({ created_by: userId });

      if (!!todos) {
        todos.forEach((_, index) => {
          todos[index].__v = undefined;
        });
      }
      return res.status(200).json({ todos });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async editTodo(req: Req<any>, res: Res) {
    try {
      const {
        body,
        params: { id },
      } = req;
      const date = new Date().getTime();
      await TodoModel.findByIdAndUpdate(id, {
        ...body,
        updated_at: date,
      });

      return res.status(200).json({ message: "Todo was editaled susscefully" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async deleTodo(req: Req<any>, res: Res) {
    try {
      const {
        params: { id },
      } = req;
      const todo = await TodoModel.findByIdAndDelete(id);

      if (!todo) return res.status(404).json({ message: "Todo was not found" });

      return res.status(200).json({ message: "Todo was deleted susscefully" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default TodoController;
