import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { BiMessageAltError } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import readLogo from "../../Assets/Images/msg-tick.svg";
import { toastError } from "../../FlysesApi/FlysesApi";
import {
  chatReadApi,
  getChatDetail,
  getUserOnlineStatusValue,
  sendChat,
} from "../../FlysesApi/Chat";
import { useAtom } from "@dbeining/react-atom";
import {
  REACT_APP,
  addNewNotificationCall,
  setLoadingStatus,
} from "../../FlysesApi";
import "./Chat.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

export const Chat = () => {
  const hiddenFileInput = useRef(null);
  const [messageDocument, setMessageDocument] = useState(null);
  const [fileUpload, setFileUpload] = useState(false);
  const [messageInputText, setMessageInputText] = useState("");
  const [messageList, setMessageList] = useState();
  const { responseObj, actionType } = useAtom(addNewNotificationCall);
  // const { userId, data } = useAtom(newReadMessageReqStatus);
  const MessageListREf = useRef(null);
  const innerDivRef = useRef(null);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [newMsgBtn, setNewMsgBtn] = useState(false);
  const [isOnlineStatus, setIsOnlineStatus] = useState("Offline");
  const loginUserId = sessionStorage.getItem("userId") || 0;
  const [emojiModalOpen, setEmojiModalOpen] = useState(false);
  const [emojiModalClick, setEmojiModalClick] = useState(false);

  useEffect(() => {
    //readChat();
    if (isScrollDown) {
      innerDivRef.current.scrollTop = innerDivRef.current.scrollHeight;
      setIsScrollDown(false);
    }
    getUserOnlineStatus();
  }, [messageList]);

  const getUserOnlineStatus = () => {
    try {
      //setLoadingStatus(true);
      getUserOnlineStatusValue()
        .then((response) => {
          if (response) {
            setIsOnlineStatus(response.status === 1 ? "Online" : "Offline");
          } else {
            setIsOnlineStatus("Offline");
          }
          //setLoadingStatus(false);
        })
        .catch(() => {
          toastError("Bad response from server");
        });
    } catch {
      toastError("Bad response from server");
    }
  };

  const readChat = () => {
    chatReadApi(loginUserId).catch(() => {
      toastError("Bad response from server");
    });
  };

  useEffect(() => {
    if (
      actionType !== "" &&
      Number(responseObj?.ctUserId) === Number(loginUserId)
    ) {
      let array = [];
      if (MessageListREf?.current?.value?.length > 0) {
        array = JSON.parse(MessageListREf?.current?.value);
      }

      if (actionType === "Delete") {
        if (Number(responseObj?.ctId) !== 0) {
          setMessageList(array.filter((x) => x.ctId !== responseObj?.ctId));
        } else {
          if (Number(responseObj?.ctUserId) === 0) {
            toastError("Bad response from server");
          } else {
            getMessageList();
          }
        }
      }

      if (actionType === "Insert") {
        const isSend = sessionStorage.getItem("userMessageSend") || "No";
        if (isSend === "Yes") {
          setIsScrollDown(true);
          sessionStorage.setItem("userMessageSend", "No");
        } else {
          const isScrollPositionBottom =
            sessionStorage.getItem("userScrollDown") || "No";
          if (isScrollPositionBottom === "Yes") {
            setIsScrollDown(true);
          } else {
            const userScrollHeigth =
              sessionStorage.getItem("userScrollHeigth") || "";
            if (userScrollHeigth !== "") {
              setNewMsgBtn(true);
            }
          }
        }

        array.push(responseObj);
        setMessageList(array);
      }
    } else {
      getMessageList();
      // if(actionType !== "OnlineStatus")
      // {
      //   getMessageList();
      // }
      // else{
      //   if(Number(responseObj?.isOnline) === 1){
      //     setIsOnlineStatus("Online");
      //   }
      //   else{
      //     setIsOnlineStatus("Offline");
      //   }
      // }
    }
  }, [responseObj]);

  // useEffect(() => {
  //   // if (Number(userId) === Number(loginUserId)) {

  //   //   let array = [];
  //   //   if (MessageListREf?.current?.value?.length > 0) {
  //   //     array = JSON.parse(MessageListREf?.current?.value);
  //   //   }

  //   //   setMessageList(array.map(function (item) {
  //   //     const exists = data.filter((x) => x.ctId === item.ctId);
  //   //     if(exists.length > 0)
  //   //     {
  //   //       return { ...item, ctIsRead : 1 };
  //   //     }
  //   //     else{
  //   //       return { ...item};
  //   //     }
  //   //   }));

  //   // }
  // }, [data]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (messageInputText !== "") {
      const messageObj = {
        ctUserId: loginUserId,
        ctMessage: messageInputText,
        ctDocument: messageDocument,
        ctIsAdmin: 0,
      };

      sessionStorage.setItem("userScrollHeigth", "");
      sessionStorage.setItem("userMessageSend", "Yes");

      sendChat(messageObj)
        .then(() => {
          clear();
        })
        .catch(() => {
          toastError(
            "Chat could not be send due to a network issue. Please contact the administrator if the issue persists."
          );
        });
    }
  };

  const clear = () => {
    setMessageInputText("");
    //setEmojiModalOpen(false);
    setMessageDocument(null);
    setFileUpload(false);
  };

  const handleAttachmentClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (e) => {
    if (e === null) {
      return true;
    }

    let files = e.target.files;
    if (files.length > 0) {
      const file = e.target.files[0];
      var fileSize = files[0]?.size;

      if (fileSize < 100000000) {
        setMessageDocument(file);
        setMessageInputText(file.name);
        setFileUpload(true);
      } else {
        alert("Maximum 100 mb file are allowed!");
        setMessageDocument(null);
        setMessageInputText("");
        setFileUpload(false);
      }
    } else {
      setMessageDocument(null);
      setMessageInputText("");
      setFileUpload(false);
    }
  };

  const handleAttachmentClearClick = () => {
    setMessageInputText("");
    setFileUpload(false);
  };

  const getMessageList = () => {
    //setLoadingStatus(true);
    getChatDetail(loginUserId, 0)
      .then((response) => {
        if (response.length > 0) {
          setIsScrollDown(true);
          setMessageList(response);
        } else {
          setMessageList([]);
        }
        //setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const handleScroll = () => {
    const el = innerDivRef?.current;
    sessionStorage.setItem("userScrollHeigth", el.scrollTop);
    if (Number(el.scrollTop + 1) >= Number(el.scrollHeight - el.clientHeight)) {
      sessionStorage.setItem("userScrollDown", "Yes");
      setNewMsgBtn(false);
    } else {
      sessionStorage.setItem("userScrollDown", "No");
    }
  };

  const handleMessageScrollDown = () => {
    innerDivRef.current.scrollTop = innerDivRef.current.scrollHeight;
    setNewMsgBtn(false);
  };

  const handleDownloadDocument = (id) => {
    setLoadingStatus(true);
    var url = String(REACT_APP + "chat/DownloadMessageDocument/" + id);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.target = "_blank";
    downloadLink.click();
    setLoadingStatus(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageInputText(messageInputText + event.emoji);
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (divRef.current && !divRef.current.contains(event.target)) {
  //       setEmojiModalClick(false);
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  // const divRef = useRef(null);

  // function handleButtonClick(event) {
  //   event.stopPropagation();
  //   setEmojiModalClick(!emojiModalClick);
  // }

  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setShowPanel(false);
    }
  };

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };
  return (
    <div className="container chat">
      <Header />
      <div className="container chat">
        <input
          type="hidden"
          ref={MessageListREf}
          value={JSON.stringify(messageList)}
        />

        <div className="card mt-5" style={{ marginBottom: "25px" }}>
          <h5 className="card-header" style={{ backgroundColor: "white" }}>
            <div className="row">
              <div className="col-1">
                <img src="../ui/images/chat-logo.svg" />
              </div>
              <div className="col" style={{ position: "relative" }}>
                <span className="header">Team Flyses</span>
                <br />
                <div
                  className={isOnlineStatus === "Online" ? "dot" : "offlineDot"}
                />
                <span
                  className={
                    isOnlineStatus === "Online" ? "online-text" : "offlineText"
                  }
                >
                  {isOnlineStatus}
                </span>
                {/* <span className="local-time">Local time: 6:30PM</span> */}
              </div>
              <div className="col Availability-time-div">
                <span className="Availability-time">
                  Availability 9:30AM to 9:30PM IST
                </span>
                {/* <img src="../ui/images/dustbin.svg" /> */}
              </div>
            </div>
          </h5>
          <div className="card-body">
            <div className="chat-box" ref={innerDivRef} onScroll={handleScroll}>
              <h5 className="day">Yesterday</h5>

              {messageList &&
                messageList.map((item, value) => {
                  if (String(item.userRole) === "1") {
                    return (
                      <>
                        {item.ctOriginalDocument !== null && (
                          <div className="user-msg-div">
                            <p className="user-msg">
                              <div className="documentText">
                                {item.ctOriginalDocument}
                              </div>
                              <div
                                className="info-box-icon downloadBtnDiv"
                                onClick={() =>
                                  handleDownloadDocument(item.ctId)
                                }
                              >
                                <img src="../ui/Images/Vector.png" />
                              </div>
                            </p>
                            <span className="user-msg-time">
                              {" "}
                              {item.messageTime}
                            </span>
                            <label
                              className="user-msg-time"
                              style={{ fontSize: "12px", marginLeft: "5px" }}
                            >
                              {item.sendDateStatus}
                            </label>
                          </div>
                        )}
                        {item.ctOriginalDocument === null && (
                          <div className="user-msg-div">
                            <p className="user-msg">{item.ctMessage}</p>
                            <span className="user-msg-time">
                              {item.messageTime}
                            </span>
                            <label
                              className="user-msg-time"
                              style={{ fontSize: "12px", marginLeft: "5px" }}
                            >
                              {item.sendDateStatus}
                            </label>
                          </div>
                        )}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {item.ctOriginalDocument !== null && (
                          <div className="admin-msg-div">
                            <span className="admin-msg-time">
                              {" "}
                              {item.messageTime}
                            </span>
                            <label
                              className="admin-msg-time"
                              style={{ fontSize: "12px", marginLeft: "5px" }}
                            >
                              {item.sendDateStatus}
                            </label>
                            <p className="admin-msg">
                              <div className="documentText">
                                {item.ctOriginalDocument}
                              </div>
                              <div
                                className="info-box-icon downloadBtnDiv"
                                onClick={() =>
                                  handleDownloadDocument(item.ctId)
                                }
                              >
                                <img src="../ui/Images/Vector.png" />
                              </div>
                            </p>
                          </div>
                        )}
                        {item.ctOriginalDocument === null && (
                          <div className="admin-msg-div">
                            <span className="admin-msg-time">
                              {item.messageTime}
                            </span>
                            <label
                              className="admin-msg-time"
                              style={{ fontSize: "12px", marginLeft: "-10px" }}
                            >
                              {item.sendDateStatus}
                            </label>
                            <p className="admin-msg">{item.ctMessage}</p>
                          </div>
                        )}
                      </>
                    );
                  }
                })}
            </div>

            {newMsgBtn && (
              <div
                className="NewMessageAddBox"
                onClick={handleMessageScrollDown}
              >
                <div class="centered-element">
                  <BiMessageAltError
                    style={{
                      fontSize: "24px",
                      color: "rgb(73 73 73)",
                      marginTop: "-27px",
                    }}
                  />
                </div>
                <div class="centered-element">
                  <BsArrowDown
                    style={{
                      fontSize: "22px",
                      color: "rgb(73 73 73)",
                      marginTop: "27px",
                    }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={sendMessage}>
              <div className="chat-box">
                <div className="row">
                  <div ref={panelRef}>
                    {showPanel && (
                      <div className="EmojiPickerDiv">
                        <Picker onEmojiClick={onEmojiClick} />
                      </div>
                    )}
                    <div
                      className="message-input info-box"
                      style={{
                        alignItems: "center",
                        minHeight: "60px",
                        background: "rgb(245 245 245)",
                        padding: "0px",
                        borderRadius: 36,
                      }}
                    >
                      <span
                        className="info-box-icon"
                        style={{
                          borderRight: "1px solid #c8c8c8",
                        }}
                      >
                        <img
                          src="../ui/Images/smile.svg"
                          style={{ marginRight: "10px", cursor: "pointer" }}
                          onClick={togglePanel}
                        />
                      </span>
                      <span
                        className="info-box-icon"
                        style={{ marginLeft: "5px" }}
                      >
                        {fileUpload && (
                          <IoCloseSharp
                            className="deleteIconClass"
                            onClick={handleAttachmentClearClick}
                            style={{
                              fontSize: "24px",
                              marginRight: "5px",
                              cursor: "pointer",
                              color: "#546be0",
                            }}
                          />
                        )}
                        {!fileUpload && (
                          <img
                            src="../ui/Images/paperclip.svg"
                            style={{ marginRight: "5px", cursor: "pointer" }}
                            onClick={handleAttachmentClick}
                          />
                        )}
                        {!fileUpload && (
                          <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                        )}
                      </span>
                      <input
                        className="form-control text-input"
                        style={{
                          border: "none",
                          backgroundColor: "#ededed",
                          marginTop: "3px",
                        }}
                        value={messageInputText}
                        onChange={(e) => setMessageInputText(e.target.value)}
                        disabled={fileUpload}
                      ></input>
                      <div className="">
                        <img
                          src="../ui/Images/download-tri.png"
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            marginLeft: "10px",
                          }}
                          onClick={sendMessage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
