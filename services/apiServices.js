import axios from "axios";

export async function createUserApi() {
    const response = await axios.post("/api/user")
    return response
}

export async function createTodoApi(todo) {
    try {
        const response = await axios.post("/api", todo, {
            "Content-Type": "application/json",
        });
        return response.data;
    } catch (error) {
        console.log("Error while creating todo in client", error);
    }
}

export async function getTodosApi() {
    try {
        const response = await axios.get("/api");
        return response.data;
    } catch (error) {
        console.log("Error while fetching todo list");
    }
}

export async function deleteTodoApi(todoId) {
    try {
        const response = await axios.delete(`/api/${todoId}`);
        return response.data;
    } catch (error) {
        console.log("Error while deleting a todo", error);
    }
}
