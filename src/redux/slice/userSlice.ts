import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  resgister,
  login,
  getUser,
  deleteAuth,
  editAuth,
  getAuth,
  importExcel,
  findCartByUser,
  editImageUser,
} from "../../sevices/user";
import { message } from "antd";
import { deleteCartSlice } from "./cart/thunk/cart";
export const resgisterLogin = createAsyncThunk(
  "user/login",
  async (payload: any) => {
    const { data } = await resgister(payload);
    return data;
  }
);
export const loginForm = createAsyncThunk(
  "user/signin",
  async (payload: any) => {
    const { data, status } = await login(payload);
    return data;
  }
);

export const getAlluser = createAsyncThunk("user/getAll", async () => {
  const { data }: any = await getUser();
  const checkUser = data.filter((item) => item.role == 0);
  return checkUser;
});

export const getUser_id = createAsyncThunk(
  "user/getUser_id",
  async (id: any) => {
    const { data }: any = await getAuth(id);
    return data;
  }
);

export const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  const { data }: any = await getUser();
  const checkAdmin = data.filter((item) => item.role >= 1);
  return checkAdmin;
});

export const deteleUser = createAsyncThunk(
  "user/deteleUser",
  async (id: any) => {
    const { data }: any = await deleteAuth(id);
    return data;
  }
);

export const editUser = createAsyncThunk(
  "edit/editUser",
  async (payload: any) => {
    const { data }: any = await editAuth(payload);
    return data;
  }
);

export const importXlsx = createAsyncThunk(
  "user/importXlsx",
  async (dataImport: any) => {
    const { data }: any = await importExcel(dataImport);
    return data;
  }
);

export const findCartByUserSlice = createAsyncThunk(
  "findcart",
  async (id: any) => {
    const { data }: any = await findCartByUser(id);
    return data.cart;
  }
);

export const uploadImage = createAsyncThunk(
  "uploadImage",
  async ({ id, formData }: any) => {
    const { data, status }: any = await editImageUser(id, formData);
    return data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: <any>{
    value: [],
    cartUser: [],
    isLoading: false,
    error: false,
    login: {},
    isLogin: localStorage.getItem("isLogin") === "true",
    user: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      message.success("Logout successful!");
      state.isLogin = false;
      localStorage.setItem("isLogin", "false");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resgisterLogin.fulfilled, (state, action) => {
        state.error = false;
        state.value = action.payload.newUser;
      })
      .addCase(resgisterLogin.rejected, (state, action) => {
        state.error = true;
      });

    builder
      .addCase(loginForm.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginForm.fulfilled, (state, action) => {
        localStorage.setItem("token", JSON.stringify(action.payload));
        state.login = action.payload;
        state.error = false;
        state.isLogin = true;
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem("isLogin", "true");
      })
      .addCase(loginForm.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });

    builder.addCase(getAlluser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder
      .addCase(deteleUser.fulfilled, (state, action) => {
        state.value = state.value.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deteleUser.rejected, (state, action) => {
        // state.value = action.payload
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

    builder
      .addCase(findCartByUserSlice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(findCartByUserSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartUser = action.payload;
      });

    //getonne
    builder
      .addCase(getUser_id.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser_id.pending, (state, action) => {
        state.isLoading = true;
      });

    builder
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.isLoading = true;
      });

    //cart delete
    builder.addCase(deleteCartSlice.fulfilled, (state, action: any) => {
      const updatedCart = state.user.cart.filter(
        (item) => item.product._id !== action.payload.product
      );
      state.user.cart = updatedCart;
    });

    //add cart user

    // builder.addCase(addCartSlice.pending, (state, action) => {
    //     state.isLoading = true
    // }).addCase(addCartSlice.fulfilled, (state, action) => {
    //     if (!Array.isArray(state.user.cart)) {
    //         state.user.cart = [];
    //     }
    //     state.isLoading = false;
    //     state.user.cart.push(action.payload);
    // });
  },
});

export const { logout } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
