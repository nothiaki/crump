import { apiClient } from "../lib/axios"

type UserIn = {
  name: string,
  password: string,
}

export const authService = {
  in: async(data: UserIn) => {
    return apiClient.post('/auth', data)
  },
}
