import { GET_USER_DATA } from "@/constant/ApiUrls";
import { API } from "@/utils/ApiInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load user from localStorage on app start
export const loadUserFromStorage: any = createAsyncThunk(
  "auth/loadUserFromStorage",
  async () => {
    try {
      const response = await API.get(GET_USER_DATA,{withCredentials:true})
      if(response?.data?.success){
        return {user:response.data.user}
      }else{
        return {user:null}
      }  
    } catch (error) {
      console.log(error,"error while initially fetching user data from get-user-data")
      return {user:null}
    }
    
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFromStorage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUserFromStorage.fulfilled, (state: any, action) => {
      state.user = action.payload.user;
      state.loading = false;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
