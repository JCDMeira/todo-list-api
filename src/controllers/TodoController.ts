import TodoModel from "../models/TodoModel";
import { Req, Res } from "../types";

class TodoController {
  static async CreatTodo(req: Req<any>, res: Res) {
    try {
      const date = new Date().getTime();
      const todo = await TodoModel.create({
        ...req.body,
        created_at: date,
        updated_at: date,
      });

      return res.status(201).json({ message: "Todo sucessful created", todo });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async GetTodos(req: Req<any>, res: Res) {
    try {
      const { userId } = req.body;
      const todos = await TodoModel.find({ created_by: userId });

      return res.status(200).json({ todos });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default TodoController;
