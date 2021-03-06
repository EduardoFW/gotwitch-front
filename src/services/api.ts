import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToSnakeCase = (obj: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newObj: any = {}
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
      newObj[newKey] = obj[key]
    }
  }
  return newObj
}

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
export interface getRandomStreamParams {
  language?: string[]
  gameId?: string[]
}
export const getRandomStream = async (params?: getRandomStreamParams): Promise<streamResponse> => {
  const response = await axiosClient.get("/random-stream", { params: convertToSnakeCase(params) })
  return response.data
}

export interface Category {
  id: string
  name: string
  box_art_url: string
}
export interface SearchCategoryReturn {
  data: Category[],
}
export const searchCategory = async (category: string): Promise<SearchCategoryReturn> => {
  const response = await axiosClient.get("/search-category", { params: { query: category } })
  return response.data
}