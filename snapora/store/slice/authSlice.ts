import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItem } from "../../app/utils/storage";
import API from "@/app/utils/ApiInstance";
import { GET_USER_DATA } from "@/app/constant/apiUrls";

// 🔹 AUTO LOGIN: fetch token on app start
export const loadUserFromStorage: any = createAsyncThunk(
  "auth/loadUserFromStorage",
  async () => {
    try {
          const token = await getItem("token");
    const onboarding = await getItem("onboarded");
    
    if (token) {
        const response = await API.get(GET_USER_DATA)
        if(response?.data?.success){
          return {user:response.data.user,token:token}
        }
    } else {
      return { token: null, user: null, onboarding: onboarding === "true" };
    }
    } catch (error) {
      console.log(error,"error while initially fetching user data from get-user-data")
      return {user:null,token:null}
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
    },
    setOnboarding: (state, action) => {
      state.onboarding = action.payload;
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

export const { loginSuccess, logout, setOnboarding } = authSlice.actions;
export default authSlice.reducer;
