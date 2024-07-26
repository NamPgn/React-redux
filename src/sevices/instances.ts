import axios from "axios"
const intances = axios.create({
    baseURL: import.meta.env.VITE_DATABASE
});

export const URL_SERVER_RENDER = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_RENDER
})

export default intances