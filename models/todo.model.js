import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const TodoModel = mongoose.models.todo || mongoose.model("todo", todoSchema);

export default TodoModel;
