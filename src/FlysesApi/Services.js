import {
  apiDelete,
  apiFormDataPost,
  apiFormDataPut,
  apiGet,
  apiPost,
  apiPut,
} from "./FlysesApi";

export const getService = (searchText) => {
  return apiGet(`service?srName=${searchText}`);
};

export const CreateUserWiseReadNotification = (obj) => {
  return apiPost(`notification/CreateUserWiseReadNotificationMst`, obj);
};

export const CreateEmailAssociated = (obj) => {
  return apiPost(`user/CreateEmailAssociated`, obj);
};

export const getUserWiseReadNotification = (userId, ntId) => {
  return apiGet(`notification/GetReadNotification/${userId}/${ntId}`);
};

export const getServiceWiseCategories = (id, current) => {
  return apiGet(`category/GetCategoryForProtfolio/${id}/${current}`);
};

export const getCategoryImages = (id) => {
  return apiGet(`category/${id}`);
};

export const getServiceIconApi = (id) => {
  return apiGet(`service/getServiceFile/${id}`);
};
