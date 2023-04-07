import { publicRequest } from "../requestMethods";
import { loginCompanyFailure, loginCompanyStart, loginCompanySuccess, logoutCompanySuccess, updateCompanySuccess } from "./companyRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  updateSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("users/login", user);
    dispatch(loginSuccess(res.data));
    document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const updateUser = async (dispatch, user) => {
  try {
    const res = await publicRequest.put("users/updateUser", user, {
      withCredentials: true,
    });

    dispatch(updateSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
};

export const loginCompany = async (dispatch, company) => {
  dispatch(loginCompanyStart());
  try {
    const res = await publicRequest.post("company/login", company);
    dispatch(loginCompanySuccess(res.data));
    document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
  } catch (error) {
    dispatch(loginCompanyFailure());
  }
};

export const updateCompany = async (dispatch, company) => {
  try {
    const res = await publicRequest.put("company/updateCompany", company, {
      withCredentials: true,
    });

    dispatch(updateCompanySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const logoutCompany = async (dispatch) => {
  dispatch(logoutCompanySuccess());
};
