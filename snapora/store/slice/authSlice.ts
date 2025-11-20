import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItem, setItem, deleteItem } from "../../app/utils/storage";

// 🔹 AUTO LOGIN: fetch token on app start
export const loadUserFromStorage: any = createAsyncThunk(
  "auth/loadUserFromStorage",
  async () => {
    const token = await getItem("token");
    const user = await getItem("user");
    const onboarding = await getItem("onboarded");

    if (token && user) {
      return { token, user: JSON.parse(user), onboarding };
    } else {
      return { token: null, user: null };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: true, // when app starts
    onboarding: null, // when app starts
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      deleteItem("token");
      deleteItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFromStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUserFromStorage.fulfilled, (state: any, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.onboarding = action.payload.onboarding;
      state.loading = false;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
