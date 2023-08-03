import { apiDelete, apiGet, apiPost, apiPut } from "./FlysesApi";

export const createUser = (obj) => {
  return apiPost("user/GoogleUser", obj);
};

export const registerUser = (obj) => {
  return apiPost("user", obj);
};

export const updatePasswordKey = (obj) => {
  return apiPut("user/UpdateUserChangePasswordKey", obj);
};

export const updatePassword = (obj) => {
  return apiPut("user/UpdateUserPass", obj);
};

export const loginUser = (userEmail, userPassword, role) => {
  return apiGet(`user/Login/${userEmail}/${userPassword}/${role}`);
};

export const checkValidKey = (key) => {
  return apiGet(`user/${key}`);
};

export const updateUser = (id, obj) => {
  return apiPut(`user/${id}`, obj);
};
