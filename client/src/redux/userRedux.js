import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateSuccess:(state,action)=>{
      state.currentUser.user = action.payload
    },
    logoutSuccess:(state) => {
      state.currentUser = null;
      state.isFetching=false;
      state.error=false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure,updateSuccess ,logoutSuccess} = userSlice.actions;
export default userSlice.reducer;