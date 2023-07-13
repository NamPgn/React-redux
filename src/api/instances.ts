import axios from "axios"
const intances = axios.create({
    baseURL: "https://movies-rdez.onrender.com/api",
})
export default intances