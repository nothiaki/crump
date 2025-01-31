import { Api } from "./api";

interface User {
    name: string;
    email: string;
    password: string;
}

export const createUser = async (data: User) => {
    return await Api.post("/users", data);
}

export const getAllUsers = async () => {
    return await Api.get("/users");
}

export const getUserById = async (id: string) => {
    return await Api.get(`/users/${id}`);
}

export const deleteUser = async (id: string) => {
    return await Api.delete(`/users/${id}`);
}