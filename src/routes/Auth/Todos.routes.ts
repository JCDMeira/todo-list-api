import express from "express";
import TodoController from "../../controllers/TodoController";

const TodoRoutes = express.Router();

TodoRoutes.post("/todo", TodoController.CreatTodo);
TodoRoutes.get("/todos", TodoController.GetTodos);
TodoRoutes.put("/todo/:id", TodoController.editTodo);

export default TodoRoutes;
