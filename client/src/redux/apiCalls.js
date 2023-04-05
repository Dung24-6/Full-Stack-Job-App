import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logoutSuccess } from "./userRedux";

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

export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
  
};
