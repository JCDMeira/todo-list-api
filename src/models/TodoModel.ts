import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: Number, required: false },
  tag: { type: Array<string>, required: false },
  isCompleted: { type: Boolean, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  date: { type: Number, required: false },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
});

const TodoModel = mongoose.model("todo", TodoSchema);

export default TodoModel;
