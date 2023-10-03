import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  REACT_APP_URL,
  getChatList,
  setChatActionType,
  setChatList,
  setNewNotification,
  setNewReadMessageReq,
  setReadUserType,
} from "../../FlysesApi";
import { useAtom } from "@dbeining/react-atom";
import { toastWarning } from "../../FlysesApi/FlysesApi";

const NotificationHandler = () => {
  const [connection, setConnection] = useState(null);
  const { chatList } = useAtom(getChatList);
  const hiddenUserWiseMsgRef = useRef(null);

  useMemo(() => {}, [window.location.pathname]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${REACT_APP_URL}chatsocket`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("ReceiveMessage", (newChatObj, actionType) => {
            setChatActionType(actionType);
            if (actionType === "Insert") {
              addNewMessage(newChatObj);
            }
            if (actionType === "Delete") {
              deleteMessage(newChatObj);
            }
            if (actionType === "Read") {
              setReadUserType(newChatObj?.ctIsAdmin);
              getUserMsgReadRequest(newChatObj);
            } else {
              setReadUserType("1");
            }
            setNewNotification(newChatObj, actionType);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const addNewMessage = (newChatObj) => {
    const loginUserId = sessionStorage.getItem("userId") || 0;
    if (
      Number(loginUserId) === newChatObj?.ctUserId &&
      newChatObj?.userRole === "1"
    ) {
      const chatArray = JSON.parse(hiddenUserWiseMsgRef.current.value);
      setChatList([...chatArray.filter((x) => x.ctIsRead !== 2), newChatObj]);

      if (window.location.pathname !== "/chat") {
        toastWarning(`Team Flyses : ${newChatObj?.ctMessage}`);
      }
    } else if (
      Number(loginUserId) === newChatObj?.ctUserId &&
      newChatObj?.userRole === "0"
    ) {
      const chatArray = JSON.parse(hiddenUserWiseMsgRef.current.value);
      setChatList([...chatArray.filter((x) => x.ctIsRead !== 2), newChatObj]);
    }
  };

  const deleteMessage = (newChatObj) => {
    const chatArray = JSON.parse(hiddenUserWiseMsgRef.current.value);
    setChatList(chatArray.filter((x) => x?.ctId !== newChatObj?.ctId));
  };

  const getUserMsgReadRequest = (obj) => {
    const loginUserId = sessionStorage.getItem("userId") || 0;
    if (Number(loginUserId) === obj?.ctUserId && obj?.ctIsAdmin === 0) {
      const chatArray = JSON.parse(hiddenUserWiseMsgRef.current.value);
      // Use the map function to create a new array with updated values
      const updatedData = chatArray.map((item) => {
        if (item.ctIsRead === 0 && item.ctId <= obj?.ctId) {
          // Update the 'age' property for the matching object
          return { ...item, ctIsRead: 1 };
        }
        return item; // Keep other objects as they are
      });

      setChatList(updatedData); // Update the state with the new array
    }
  };

  useEffect(() => {
    if (hiddenUserWiseMsgRef.current) {
      hiddenUserWiseMsgRef.current.value = JSON.stringify(chatList);
    }
  }, [chatList]);

  return (
    <div>
      <input type="hidden" ref={hiddenUserWiseMsgRef} />
    </div>
  );
};

export default NotificationHandler;
