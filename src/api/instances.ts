import axios from "axios"

const intances = axios.create({
    baseURL: "https://test-19k8.onrender.com/api"
})
export default intances