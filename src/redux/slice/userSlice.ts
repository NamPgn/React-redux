import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resgister, login, getUser, deleteAuth, editAuth, getAuth, importExcel, findCartByUser } from "../../api/user";

export const resgisterLogin = createAsyncThunk(
    "user/login",
    async (payload:any) => {
        const { data } = await resgister(payload);
        return data;
    }
)
export const loginForm = createAsyncThunk(
    "user/signin",
    async (payload:any) => {
        const { data, status } = await login(payload);
        return data
    }
)

export const getAlluser = createAsyncThunk(
    "user/getAll",
    async () => {
        const { data }: any = await getUser();
        const checkUser = data.filter(item => item.role == 0);
        return checkUser;
    }
)

export const getUser_id = createAsyncThunk(
    "user/getUser_id",
    async (id: any) => {
        const { data }: any = await getAuth(id);
        return data.data;
    }
)

export const getAdmin = createAsyncThunk(
    "admin/getAdmin",
    async () => {
        const { data }: any = await getUser();
        const checkAdmin = data.filter(item => item.role == 1);
        return checkAdmin;
    }
)

export const deteleUser = createAsyncThunk(
    "user/deteleUser",
    async (id: any) => {
        const { data }: any = await deleteAuth(id);
        return data;
    }
)

export const editUser = createAsyncThunk(
    "edit/editUser",
    async (payload: any) => {
        const { data }: any = await editAuth(payload);
        return data;
    }
)

export const importXlsx = createAsyncThunk(
    'user/importXlsx',
    async (dataImport: any) => {
        const { data }: any = await importExcel(dataImport);
        return data;
    }
)


export const findCartByUserSlice = createAsyncThunk(
    'findcart',
    async (id: any) => {
        const { data }: any = await findCartByUser(id);
        return data;
    }
)
const userSlice = createSlice({

    name: "user",
    initialState: {
        value: [],
        cartUser: [],
        isLoading: false,
        error: false,
        login: {},
        isLogin: false,
    },
    reducers: {
        logout() {
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resgisterLogin.fulfilled, (state, action) => {
            state.value = action.payload.newUser;
        });
        builder.addCase(loginForm.rejected, (state, action) => {
            state.error = false
            state.isLogin = false
        }).addCase(loginForm.fulfilled, (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload))
            state.login = action.payload
            state.error = false
            state.isLogin = true
        })
        builder.addCase(getAlluser.fulfilled, (state, action) => {
            state.value = action.payload;
        });
        builder.addCase(deteleUser.fulfilled, (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload.id);
        });
        builder.addCase(getAdmin.fulfilled, (state, action) => {
            state.value = action.payload;
        });

        builder.addCase(editUser.fulfilled, (state, action) => {
            state.value.push(action.payload);
        });

        builder.addCase(importXlsx.fulfilled, (state, action) => {
            state.value.unshift(action.payload);
        });


        builder.addCase(findCartByUserSlice.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(findCartByUserSlice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartUser = action.payload;
        })
    }
})

export const { logout } = userSlice.actions;


const userReducer = userSlice.reducer

export default userReducer
