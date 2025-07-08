import axios from "axios"

export const UserInDb = async user => {
     const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  )
}