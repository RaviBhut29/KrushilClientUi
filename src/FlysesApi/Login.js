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

export const ExistsUserByEmail = (userEmail) => {
  return apiGet(`user/ExistsUserByEmail/${userEmail}`);
};

export const loginUser = (obj) => {
  return apiPost(`user/Login`,obj);
};

export const checkValidKey = (key) => {
  return apiGet(`user/${key}`);
};

export const UpdateUserStatusByEmail = (obj) => {
  return apiPut(`user/UpdateUserStatusByEmail`,obj);
};

export const updateUser = (id, obj) => {
  return apiPut(`user/${id}`, obj);
};

export const CheckValidEmailValidation = (obj) => {
  return apiPut(`user/CheckVaidEmailOnRst`, obj);
};
