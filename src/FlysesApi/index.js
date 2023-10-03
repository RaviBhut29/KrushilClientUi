import { Atom, swap } from "@dbeining/react-atom";
import axios from "axios";
const CryptoJS = require("crypto-js");

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


export const isNewNotification = { userNotification: false, localNotification: true };

export const getIsNewNotification = Atom.of({
  ...isNewNotification,
});

export const setIsNewNotification = (userNotification, localNotification) => {
  swap(getIsNewNotification, () => ({
    userNotification: userNotification,
    localNotification: localNotification,
  }));
};

// export const isChatIcon = { isVisible : true };

// export const getIsChatIcon = Atom.of({
//   ...isChatIcon,
// });

// export const setIsChatIcon = (status) => {
//   swap(getIsChatIcon, () => ({
//     isVisible: status,
//   }));
// };

export const isLoadingStatusValue = { isLoading: false };

export const isLoadingStatus = Atom.of({
  ...isLoadingStatusValue,
});

export const setLoadingStatus = (status) => {
  swap(isLoadingStatus, () => ({ isLoading: status }));
};

export const chatList = { chatList: [] };

export const getChatList = Atom.of({
  ...chatList,
});

export const setChatList = (array) => {
  swap(getChatList, () => ({ chatList: array }));
};

export const chatActionType = { actionName: "" };

export const getChatActionType = Atom.of({
  ...chatActionType,
});

export const setChatActionType = (name) => {
  swap(getChatActionType, () => ({ actionName: name }));
};

export const readUserType = { userType: "" };

export const getReadUserType = Atom.of({
  ...readUserType,
});

export const setReadUserType = (name) => {
  swap(getReadUserType, () => ({ userType: name }));
};

// export const decryptString = (key) => {
//   const secretKey = "asds-jklsd-ert";
//   //if (key !== null && key !== undefined && key !== "") {
//     const decryptedBytes = CryptoJS.AES.decrypt(key, secretKey);
//     const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
//     return decryptedText;
//   // }
//   // return null;
// };

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

// export const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// export const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
// });

// export const secretPass = "Xkhsdf64ds5f4s6d4f6sd4f6sd4f6sd4fZG4fW2t2W";

// export const encryptWithAES = (text) => {
//   const encryptedString = encrypt(String(text), secretPass); // #Iblankartan!not!svreblankartwhfreblankartzpublankartase!gettiogblankartypvrblankartiofprmatipn,blankartcvtblankartgpoeblankarttopid.blankartI!oeedtblankartuoblankartspeodblankartspneblankarttjmfblankartlearoing!nore!osblankartundesstaoeing!mpre.blankartTiankt!for!eycelleotblankartiogoblankartI!wbsblankartlooling!gorblankartuhjsblankartinfpblankartfos!myblankartnitsion.#
//   return encryptedString;
// };



// export const encryptString = (text, key) => {
//   return AES.encrypt(text, key).toString();
// };

// export const decryptString = (encryptedText, key) => {
//   const bytes = AES.decrypt(encryptedText, key);
//   return bytes.toString();
// };

// export const encryptWithAES = (text) => {
//   const secretKey = 'hjkd34fd56kh'; // Replace with your secret key
//   const encryptedString = encryptString(text, secretKey);
//   return encryptedString;
// };

export const numberToWord = {
  1: "w",
  2: "l",
  3: "e",
  4: "u",
  5: "m",
  6: "f",
  7: "n",
  8: "j",
  9: "s",
  0: "z",
};

export const wordToNumber = {
  w: 1,
  l: 2,
  e: 3,
  u: 4,
  m: 5,
  f: 6,
  n: 7,
  j: 8,
  s: 9,
  z: 0,
};

export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const getEncrptWord = async(text) => {
  
  let getString = "";

  await Array.from(text.toString()).map((x) => {
    const word = Number(x);
    getString += numberToWord[word];
  });

  const encrptData = await (generateRandomString(3).toString() + getString + generateRandomString(4).toString()).toString();
  return encrptData;
};

export const getDecrptWord = async(text) => {
  let result = await text.substring(3, (text.length - 4));
  let getString = "";

  await Array.from(result).map((x) => {
    getString += wordToNumber[x].toString();
  });

  return getString;
};

export const encrptWithRk = async (text) => {
  const data = await getEncrptWord(text);
  return data;
};

export const decryptWithRk = async (text) => {
  const data = await getDecrptWord(text);
  return data;
};