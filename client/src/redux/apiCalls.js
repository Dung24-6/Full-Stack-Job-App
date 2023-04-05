import { publicRequest } from "../requestMethods";
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
