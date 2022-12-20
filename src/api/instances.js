import axios from "axios"

const intances = axios.create({
    baseURL: "http://localhost:8000/api/"
})
export default intances