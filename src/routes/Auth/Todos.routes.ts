import express from "express";
import TodoController from "../../controllers/TodoController";

const TodoRoutes = express.Router();

TodoRoutes.post("/todo", TodoController.CreateTodo);
TodoRoutes.get("/todos", TodoController.GetTodos);
TodoRoutes.put("/todo/:id", TodoController.editTodo);
TodoRoutes.delete("/todo/:id", TodoController.deleTodo);

export default TodoRoutes;
