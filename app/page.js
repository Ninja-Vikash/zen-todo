"use client";
import { useEffect, useState } from "react";
import {
    createTodoApi,
    createUserApi,
    deleteTodoApi,
    getTodosApi,
} from "@/services/apiServices";

export default function Home() {
    const [todo, setTodo] = useState({
        title: "",
        description: "",
    });
    const [todoList, setTodoList] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const handleTodoData = (e) => {
        setTodo((prevDets) => ({
            ...prevDets,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const createTodo = async (e) => {
        e.preventDefault();

        setIsCreating(true);
        try {
            await createTodoApi(todo);
        } catch (error) {
            console.log("Error while creating todo in client", error);
        }
        setIsCreating(false);

        setTodo(() => ({
            title: "",
            description: "",
        }));
    };

    const getTodos = async () => {
        try {
            const response = await getTodosApi();

            setTodoList(response);
        } catch (error) {
            console.log("Error while fetching todo list");
        }
    };

    const deleteTodo = async (todoId) => {
        setIsDeleting(true);
        try {
            await deleteTodoApi(todoId);
        } catch (error) {
            console.log("Error while deleting a todo", error);
        }
        setIsDeleting(false);
    };

    useEffect(() => {
        getTodos();
    }, [isCreating, isDeleting]);

    return (
        <div className="text-white font-[Poppins] pt-8 bg-zinc-950">
            <div className="max-w-[64rem] mx-auto flex gap-4">
                <div className="flex-1">
                    <h1 className="text-3xl mb-2">Zen Todo App!</h1>
                    <form onSubmit={createTodo}>
                        <div className="flex flex-col">
                            <label htmlFor="title">Todo Name: </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={todo.title}
                                onChange={handleTodoData}
                                className="bg-zinc-900 py-2 px-2 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="desc">Todo Description: </label>
                            <textarea
                                type="text"
                                id="desc"
                                name="description"
                                value={todo.description}
                                onChange={handleTodoData}
                                className="bg-zinc-900 py-2 px-2 rounded-lg resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 px-2 py-1 bg-purple-400 rounded-lg"
                        >
                            Save
                        </button>
                    </form>
                </div>

                <div className={`${todoList.length ? "block" : "hidden"} flex-1`}>
                    <h3 className="text-xl mb-2">My todos 👇</h3>
                    {todoList.map(({ _id, title, description }, idx) => (
                        <div
                            key={idx}
                            className={`${
                                checkedItems[_id]
                                    ? "bg-green-800"
                                    : "bg-zinc-800"
                            } rounded-lg px-4 py-1 mb-2 flex gap-3 items-center`}
                        >
                            <input
                                type="checkbox"
                                className="w-6 h-6 hover:cursor-pointer"
                                onChange={() => handleCheckboxChange(_id)}
                            />
                            <div>
                                <h5 className="font-medium">{title}</h5>
                                <p className="text-sm text-zinc-400">
                                    {description}
                                </p>
                            </div>

                            <div className="ml-auto">
                                <button
                                    className="hover:cursor-pointer"
                                    onClick={() => deleteTodo(_id)}
                                >
                                    <img
                                        src="/trash.svg"
                                        alt="delete"
                                        className="h-4 w-4 invert-100"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
