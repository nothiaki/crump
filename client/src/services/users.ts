import { apiClient } from "../lib/axios";

type User = {
  name: string,
  email: string,
  password: string,
}

export const usersService = {
  create: async (data: User) => {
    return await apiClient.post('/users', data)
  },

  getAll: async () => {
    return await apiClient.get('/users')
  },

  getById: async (id: string) => {
    return await apiClient.get(`/users/${id}`)
  },

  remove: async (id: string) => {
    return await apiClient.delete(`/users/${id}`)
  },
}
