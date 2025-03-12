import connectDB from "@/lib/db";
import TodoModel from "@/models/todo.model";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
    const { todoId } = await params;

    try {
        await connectDB();

        const deletedTodo = await TodoModel.findOneAndDelete(
            { _id: todoId },
            { new: true }
        );

        return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: `Error while deleting ${error.message}` },
            { status: 500 }
        );
    }
}
