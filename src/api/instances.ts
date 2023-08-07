import axios from "axios"
import { isAuthentication } from "../auth/getToken"
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../hook";
import { logout } from "../redux/slice/userSlice";
import Success from "../components/Message/Success";
const intances = axios.create({
    baseURL: "http://localhost:8000/api"
})


intances.interceptors.request.use((config) => {
    const Auth = isAuthentication();
    if (config.method !== "get") {
        if (Auth?.token) {
            const decodeToken: any = jwtDecode(Auth.token);
            if (decodeToken && decodeToken.exp && Date.now() / 1000 > decodeToken.exp) {
                // Token đã hết hạn, đăng xuất user và chuyển hướng đến trang đăng nhập
                const dispath = useAppDispatch();
                dispath(logout());
                window.location.href = '/auth/signin'; // Chuyển hướng đến trang đăng nhập
                Success('Token hết hạn cần đăng nhập lại!')
            } else {
                // Token còn hạn, thêm token vào header của yêu cầu
                config.headers.Authorization = `Bearer ${Auth.token}`;
            }
        }
    }
    return config;
})

export default intances