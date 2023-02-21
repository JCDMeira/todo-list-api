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
        isCompleted: false,
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
      const { format } = req.query;

      const todos = await TodoModel.find({ created_by: userId });

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
