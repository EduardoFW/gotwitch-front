import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

interface streamResponse {
    data: {
        id: string
        user_id: string
        user_login: string
        user_name: string
        game_id: string
        game_name: string
        type: string
        title: string
        viewer_count: number
        started_at: Date
        language: string
        thumbnail_url: string,
        tag_ids: string[]
        is_mature: boolean
    }
}
export const getRandomStream = async (): Promise<streamResponse> => {
    const response = await axiosClient.get("/random-stream")
    return response.data
}
