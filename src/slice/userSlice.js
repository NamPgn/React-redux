import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resgister, login, getUser, deleteAuth, editAuth, getAuth, editAvt, importExcel } from "../api/user";

export const resgisterLogin = createAsyncThunk(
    "user/login",
    async (payload) => {
        const { data } = await resgister(payload);
        return data;
    }
)
export const loginForm = createAsyncThunk(
    "user/signin",
    async (payload) => {
        const { data } = await login(payload)
        return data
    }
)

export const getAlluser = createAsyncThunk(
    "user/getAll",
    async () => {
        const { data } = await getUser();
        const checkUser = data.filter(item => item.role == 0);
        return checkUser;
    }
)

export const getUser_id = createAsyncThunk(
    "user/getUser_id",
    async (id) => {
        const { data } = await getAuth(id);
        return data.data;
    }
)

export const getAdmin = createAsyncThunk(
    "admin/getAdmin",
    async () => {
        const { data } = await getUser();
        const checkAdmin = data.filter(item => item.role == 1);
        return checkAdmin;
    }
)

export const deteleUser = createAsyncThunk(
    "user/deteleUser",
    async (id) => {
        const { data } = await deleteAuth(id);
        return data;
    }
)

export const editUser = createAsyncThunk(
    "edit/editUser",
    async (payload) => {
        const { data } = await editAuth(payload);
        console.log("data", data);
        return data;
    }
)

export const editImage = createAsyncThunk(
    "edit/editAvt",
    async (payload) => {
        const { data } = await editAvt(payload);
        return data.data;
    }
)

export const importXlsx = createAsyncThunk(
    'user/importXlsx',
    async (dataImport) => {
        const { data } = await importExcel(dataImport);
        console.log("dataIp", data);
        return data;
    }
)
const userSlice = createSlice({

    name: "user",
    initialState: {
        value: [],
    },
    reducers: {
        logout(state) {
            localStorage.clear()
        },
        resetState(state) {
            state.value = initialState.value
        },
        resetDetail(state) {
            state.detail = initialState.detail
        },
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(resgisterLogin.fulfilled, (state, action) => {
            // console.log("action", action)
            state.value = action.payload.newUser;
        });
        builder.addCase(loginForm.fulfilled, (state, action) => {
            localStorage.setItem('token', JSON.stringify(action.payload))
            // console.log("action.payload", action.payload);
            state.isAuthenticate = true;
        });
        builder.addCase(getAlluser.fulfilled, (state, action) => {
            // console.log("action", action.payload)
            state.value = action.payload;
        });
        builder.addCase(deteleUser.fulfilled, (state, action) => {
            // console.log("actionUser", action.payload)
            // console.log("stateUser", state)
            state.value = state.value.filter(item => item._id !== action.payload._id);
        });
        builder.addCase(getAdmin.fulfilled, (state, action) => {
            state.value = action.payload;
        });

        builder.addCase(editUser.fulfilled, (state, action) => {
            state.value.push(action.payload);
        });
        builder.addCase(editImage.fulfilled, (state, action) => {
            console.log("action", action.payload)
            state.value = action.payload;
        });
        builder.addCase(importXlsx.fulfilled, (state, action) => {
            state.value.unshift(action.payload);
        })

    }
})

export const userActions = userSlice.actions;

export const selectUserValue = (state) => state.user.value;

const userReducer = userSlice.reducer

export default userReducer
