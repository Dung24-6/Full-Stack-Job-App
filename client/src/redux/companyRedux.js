import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    currentCompany: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginCompanyStart: (state) => {
      state.isFetching = true;
    },
    loginCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.currentCompany = action.payload;
    },
    loginCompanyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateCompanySuccess:(state,action)=>{
      state.currentCompany.company = action.payload
    },
    logoutCompanySuccess:(state) => {
      state.currentCompany = null;
      state.isFetching=false;
      state.error=false;
    },
  },
});

export const { loginCompanyStart, loginCompanySuccess, loginCompanyFailure,updateCompanySuccess ,logoutCompanySuccess} = companySlice.actions;
export default companySlice.reducer;