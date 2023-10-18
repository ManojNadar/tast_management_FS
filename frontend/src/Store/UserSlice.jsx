import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Components/AuthConfig/Api";

export const RegisterUser = createAsyncThunk("user/register", async (user) => {
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

export const LoginUser = createAsyncThunk("user/login", async (user) => {
  //   console.log(user);
  try {
    const response = await api.post("/login", { user });
    if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
});

export const CurrentUser = createAsyncThunk(
  "user/currentuser",
  async (user) => {
    //   console.log(user);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.post("/currentuser", { token });
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
});

export default userSlice.reducer;
