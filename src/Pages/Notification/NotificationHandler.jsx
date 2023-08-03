import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { REACT_APP_URL, setNewNotification, setNewReadMessageReq } from "../../FlysesApi";

const NotificationHandler = () => {
    const [connection, setConnection] = useState(null);

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
                setNewNotification(newChatObj, actionType);
              });
            })
            .catch((e) => console.log("Connection failed: ", e));
        }
      }, [connection]);

  return <div></div>;
};

export default NotificationHandler;
