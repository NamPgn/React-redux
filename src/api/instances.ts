import axios from "axios"

const intances = axios.create({
    baseURL: "http://localhost:8001/api/"
})
export default intances