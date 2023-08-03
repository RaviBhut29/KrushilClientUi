import { Atom, swap } from "@dbeining/react-atom";
import axios from "axios";

// export const REACT_APP = "http://api.flyses.com/api/";
// export const REACT_APP_URL = "http://api.flyses.com/";
// axios.defaults.baseURL = "http://api.flyses.com/api/";

// export const REACT_APP = "https://api.flyses.com/api/";
// export const REACT_APP_URL = "https://api.flyses.com/";
// axios.defaults.baseURL = "https://api.flyses.com/api/";

export const REACT_APP = "http://localhost:7289/api/";
export const REACT_APP_URL = "http://localhost:7289/";
axios.defaults.baseURL = "http://localhost:7289/api/";

axios.defaults.headers.post["Content-Type"] = "application/json";

// const initialLoadingState = {
//   isLoading: false,
// };

export const userNotificationDetail = {
  userId: "",
  userSortName: "",
  UserFullName: "",
};

export const userNotificationDetailCall = Atom.of({
  ...userNotificationDetail,
});

export const setUserNotificationDetail = (
  userId,
  userSortName,
  UserFullName
) => {
  console.warn(userId);
  swap(userNotificationDetailCall, () => ({
    userId: userId,
    userSortName: userSortName,
    UserFullName: UserFullName,
  }));
};

export const addNewNotification = { responseObj: {}, actionType: "" };

export const addNewNotificationCall = Atom.of({
  ...addNewNotification,
});

export const setNewNotification = (objPer, actionTypePer) => {
  swap(addNewNotificationCall, () => ({
    responseObj: objPer,
    actionType: actionTypePer,
  }));
};

export const isLoadingStatusValue = { isLoading: false };

export const isLoadingStatus = Atom.of({
  ...isLoadingStatusValue,
});

export const setLoadingStatus = (status) => {
  swap(isLoadingStatus, () => ({ isLoading: status }));
};

// export const newReadMessageReq = { userId: "", data : []  };

// export const newReadMessageReqStatus = Atom.of({
//   ...newReadMessageReq,
// });

// export const setNewReadMessageReq = (userId,data) => {
//   swap(newReadMessageReqStatus, () => ({
//     userId: userId,
//     data: data,
//   }));
// };

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
