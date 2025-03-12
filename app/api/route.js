import connectDB from "@/lib/db";
import TodoModel from "@/models/todo.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const todos = await TodoModel.find();

        return NextResponse.json(todos, { status: 201 });
    } catch (error) {
        console.log("Error while fetching todos in server", error);
        return NextResponse.json(
            { error: "Error while fetching todos in server" },
            { status: 401 }
        );
    }
}

export async function POST(request) {
    const { title, description } = await request.json();

    try {
        await connectDB();

        const todo = new TodoModel({title, description});
        await todo.save();

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.log("Error while creating a todo");
        return NextResponse.json(
            { error: "Error while creating a todo" },
            { status: 400 }
        );
    }
}
