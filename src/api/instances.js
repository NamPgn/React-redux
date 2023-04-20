import axios from "axios"
const intances = axios.create({
    baseURL: "https://moviee.up.railway.app/api",
})
export default intances