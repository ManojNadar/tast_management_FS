import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Components/AuthConfig/Api";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";

export const RegisterUser = createAsyncThunk("register", async (user) => {
  //   console.log(user);
  try {
    const response = await api.post("/register", { user });
    if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
});

export const LoginUser = createAsyncThunk("login", async (user) => {
  //   console.log(user);
  try {
    const response = await api.post("/login", { user });
    if (response.data.success) {
      const token = response.data.token;
      const userData = response.data.userData;
      // console.log(token);
      console.log(userData);
      localStorage.setItem("token", JSON.stringify(token));

      alert(response.data.message);
      return userData;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
});

export const LogoutUser = async () => {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    token: null,
  },
  reducers: {
    getToken: (state, action) => {
      state.token = JSON.parse(localStorage.getItem("token"));
    },
  },

  extraReducers: {
    [LoginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      const token = JSON.parse(localStorage.getItem("token"));
      state.token = token;
    },
    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Error";
    },

    // [CurrentUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [CurrentUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   const currentUser = useSelector((state) => state.user);
    //   state.user = currentUser;
    // },
    // [CurrentUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = "Error";
    // },
  },
});

export default userSlice.reducer;
export const { getToken } = userSlice.actions;
