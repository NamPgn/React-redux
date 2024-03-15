import axios from "axios"
import { isAuthentication } from "../auth/getToken"
import jwtDecode from "jwt-decode";
import { MVWarning } from "../components/Message";
const intances = axios.create({
    baseURL: import.meta.env.VITE_DATABASE
});

export const URL_SERVER_RENDER = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_RENDER
})

// intances.interceptors.response.use(
//     (response) => {
//         // Kiểm tra nếu phản hồi có response
//         if (response.data && response.config.method === 'get') {
//             const encryptedData = response.data;

//             // Giải mã dữ liệu bằng AES với cùng một khóa
//             const decryptedData = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_SECERT_CRYPTO_KEY);
//             // Gán dữ liệu đã giải mã vào phản hồi
//             const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
//             response.data = data;
//         }
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

intances.interceptors.request.use((config) => {
    const Auth = isAuthentication();
    if (config.method !== "get") {
        if (Auth?.token) {
            const decodeToken: any = jwtDecode(Auth.token);
            if (decodeToken && decodeToken.exp && Date.now() / 1000 > decodeToken.exp) {
                // Token đã hết hạn, đăng xuất user và chuyển hướng đến trang đăng nhập
                MVWarning('Token expires-relogin');
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/signin'; // Chuyển hướng đến trang đăng nhập
                }, 1500)
            } else {
                // Token còn hạn, thêm token vào header của yêu cầu
                config.headers.Authorization = `Bearer ${Auth.token}`;
            }
        }
    }
    return config;
})

export default intances