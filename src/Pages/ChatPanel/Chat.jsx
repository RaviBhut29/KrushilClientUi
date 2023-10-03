import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { BiMessageAltError } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
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
  getChatActionType,
  getChatList,
  getReadUserType,
  setChatList,
  setLoadingStatus,
} from "../../FlysesApi";
import "./Chat.css";
import Header from "../../Layout/Header";
import { MdOutlineWatchLater } from "react-icons/md";
import { VscCheckAll } from "react-icons/vsc";
import { BiSend } from "react-icons/bi";
import { PiDownloadSimpleBold } from "react-icons/pi";

export const Chat = () => {
  const loginUserId = sessionStorage.getItem("userId") || 0;
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isOnlineStatus, setIsOnlineStatus] = useState("Offline");
  const [messageInputText, setMessageInputText] = useState("");
  const [isScrollPositionIsDown, setIsScrollPositionIsDown] = useState(false);
  const [messageDocument, setMessageDocument] = useState(null);
  const [fileUpload, setFileUpload] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const MessageListREf = useRef(null);
  const parentRef = useRef(null);
  const panelRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const EmojiMessageInput = useRef(null);

  //#region Create New Chat Panel
  const { chatList } = useAtom(getChatList);
  const { actionName } = useAtom(getChatActionType);
  const { userType } = useAtom(getReadUserType);

  useEffect(() => {
    readChat();
    //call first time
    //setLoadingStatus(true);
    bindChatListFunction();
  }, []);

  const readChat = () => {
    chatReadApi(loginUserId, 1)
      .then(() => {})
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  useEffect(() => {
    if (String(userType) === "1") {
      readChat();
    }

    if (actionName !== "Delete") {
      scrollToBottom();
    }
    const scrollTop = parentRef?.current.scrollTop;
    if (scrollTop === 0) {
      setIsScrollPositionIsDown(true);
    }
    getUserOnlineStatus();
  }, [chatList]);

  const scrollToBottom = () => {
    const parentDiv = parentRef.current;
    parentDiv.scrollTop = parentDiv.scrollHeight;
  };

  const handleScroll = () => {
    const marginOfError = 5; // Define a margin of error
    const scrollTop = parentRef?.current.scrollTop;
    const clientHeight = parentRef?.current.clientHeight;
    const scrollHeight = parentRef?.current.scrollHeight;

    const isAtBottom =
      Math.abs(scrollTop + clientHeight - scrollHeight) <= marginOfError;

    setIsScrollPositionIsDown(isAtBottom);
  };

  const handleMessageScrollDown = () => {
    const parentDiv = parentRef.current;
    parentDiv.scrollTop = parentDiv.scrollHeight;
    setIsScrollPositionIsDown(true);
  };

  const bindChatListFunction = () => {
    getChatDetail(loginUserId, 0)
      .then((response) => {
        if (response.length > 0) {
          setIsScrollDown(true);
          setChatList(response);
        } else {
          setChatList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

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
    const oldStr = JSON.parse(EmojiMessageInput.current.value);
    setMessageInputText(oldStr + event.emoji);
  };

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  const handleAttachmentClearClick = () => {
    setMessageInputText("");
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

  const sendMessage = (e) => {
    e.preventDefault();

    if (messageInputText !== "") {
      const messageObj = {
        ctUserId: loginUserId,
        ctMessage: messageInputText,
        ctDocument: messageDocument,
        ctIsAdmin: 0,
        ctIsRead: 2,
      };

      const userObj = {
        chatSendTime: null,
        ctDocument: null,
        ctId: 0,
        ctIsRead: 2,
        ctMessage: messageInputText,
        ctOriginalDocument: messageInputText,
        ctUserId: loginUserId,
        messageTime: "",
        sendDateStatus: "",
        sendMsgStatus: "",
        totalMsgCount: "0",
        userName: "",
        userRole: "0",
        userSortName: "",
      };

      setChatList([...chatList, userObj]);
      const parentDiv = parentRef.current;
      parentDiv.scrollTop = parentDiv.scrollHeight;

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
    setMessageDocument(null);
    setFileUpload(false);
  };

  //#endregion

  // //#region Old data
  //
  //
  //
  //
  // const [messageList, setMessageList] = useState();
  // const { responseObj, actionType } = useAtom(addNewNotificationCall);
  // // const { userId, data } = useAtom(newReadMessageReqStatus);
  //
  //

  //
  //

  // const [emojiModalOpen, setEmojiModalOpen] = useState(false);
  // const [emojiModalClick, setEmojiModalClick] = useState(false);

  // const readChat = () => {
  //   chatReadApi(loginUserId).catch(() => {
  //     toastError("Bad response from server");
  //   });
  // };

  // useEffect(() => {
  //   if (
  //     actionType !== "" &&
  //     Number(responseObj?.ctUserId) === Number(loginUserId)
  //   ) {
  //     let array = [];
  //     if (MessageListREf?.current?.value?.length > 0) {
  //       array = JSON.parse(MessageListREf?.current?.value);
  //     }

  //     if (actionType === "Delete") {
  //       if (Number(responseObj?.ctId) !== 0) {
  //         setMessageList(array.filter((x) => x.ctId !== responseObj?.ctId));
  //       } else {
  //         if (Number(responseObj?.ctUserId) === 0) {
  //           toastError("Bad response from server");
  //         } else {
  //           getMessageList();
  //         }
  //       }
  //     }

  //     if (actionType === "Insert") {
  //       const isSend = sessionStorage.getItem("userMessageSend") || "No";
  //       if (isSend === "Yes") {
  //         setIsScrollDown(true);
  //         sessionStorage.setItem("userMessageSend", "No");
  //       } else {
  //         const isScrollPositionBottom =
  //           sessionStorage.getItem("userScrollDown") || "No";
  //         if (isScrollPositionBottom === "Yes") {
  //           setIsScrollDown(true);
  //         } else {
  //           const userScrollHeigth =
  //             sessionStorage.getItem("userScrollHeigth") || "";
  //           if (userScrollHeigth !== "") {
  //             setNewMsgBtn(true);
  //           }
  //         }
  //       }

  //       array.push(responseObj);
  //       setMessageList(array);
  //     }
  //   } else {
  //     getMessageList();
  //     // if(actionType !== "OnlineStatus")
  //     // {
  //     //   getMessageList();
  //     // }
  //     // else{
  //     //   if(Number(responseObj?.isOnline) === 1){
  //     //     setIsOnlineStatus("Online");
  //     //   }
  //     //   else{
  //     //     setIsOnlineStatus("Offline");
  //     //   }
  //     // }
  //   }
  // }, [responseObj]);

  // // useEffect(() => {
  // //   // if (Number(userId) === Number(loginUserId)) {

  // //   //   let array = [];
  // //   //   if (MessageListREf?.current?.value?.length > 0) {
  // //   //     array = JSON.parse(MessageListREf?.current?.value);
  // //   //   }

  // //   //   setMessageList(array.map(function (item) {
  // //   //     const exists = data.filter((x) => x.ctId === item.ctId);
  // //   //     if(exists.length > 0)
  // //   //     {
  // //   //       return { ...item, ctIsRead : 1 };
  // //   //     }
  // //   //     else{
  // //   //       return { ...item};
  // //   //     }
  // //   //   }));

  // //   // }
  // // }, [data]);

  // const sendMessage = (e) => {
  //   e.preventDefault();

  //   if (messageInputText !== "") {
  //     const messageObj = {
  //       ctUserId: loginUserId,
  //       ctMessage: messageInputText,
  //       ctDocument: messageDocument,
  //       ctIsAdmin: 0,
  //     };

  //     sessionStorage.setItem("userScrollHeigth", "");
  //     sessionStorage.setItem("userMessageSend", "Yes");

  //     sendChat(messageObj)
  //       .then(() => {
  //         clear();
  //       })
  //       .catch(() => {
  //         toastError(
  //           "Chat could not be send due to a network issue. Please contact the administrator if the issue persists."
  //         );
  //       });
  //   }
  // };

  //

  //

  //

  //

  // const getMessageList = () => {
  //   //setLoadingStatus(true);
  //   getChatDetail(loginUserId, 0)
  //     .then((response) => {
  //       if (response.length > 0) {
  //         setIsScrollDown(true);
  //         setMessageList(response);
  //       } else {
  //         setMessageList([]);
  //       }
  //       //setLoadingStatus(false);
  //     })
  //     .catch(() => {
  //       toastError("Bad response from server");
  //     });
  // };

  // // useEffect(() => {
  // //   function handleClickOutside(event) {
  // //     if (divRef.current && !divRef.current.contains(event.target)) {
  // //       setEmojiModalClick(false);
  // //     }
  // //   }

  // //   document.addEventListener('click', handleClickOutside);

  // //   return () => {
  // //     document.removeEventListener('click', handleClickOutside);
  // //   };
  // // }, []);

  // // const divRef = useRef(null);

  // // function handleButtonClick(event) {
  // //   event.stopPropagation();
  // //   setEmojiModalClick(!emojiModalClick);
  // // }

  //
  //

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event) => {
  //   if (panelRef.current && !panelRef.current.contains(event.target)) {
  //     setShowPanel(false);
  //   }
  // };

  // //#endregion

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  useEffect(() => {
    if (EmojiMessageInput.current) {
      EmojiMessageInput.current.value = JSON.stringify(messageInputText);
      console.warn("json ", JSON.parse(EmojiMessageInput.current.value));
    }
  }, [messageInputText]);

  return (
    <div className="container chat">
      <Header />
      <div className="container">
        <input
          type="hidden"
          ref={MessageListREf}
          value={JSON.stringify(chatList)}
        />
        <input
          type="hidden"
          ref={EmojiMessageInput}
          value={JSON.stringify(messageInputText)}
        />
        <div className="card mt-2" style={{ marginBottom: "25px" }}>
          <h5 className="card-header" style={{ backgroundColor: "white" }}>
            <div className="row">
              <div className="col-md-1 ChatLogoDiv">
                <img src="/ui/images/ChatLogo.svg" className="ChatLogo" />
              </div>
              <div className="col">
                <span className="header">Team Flyses</span>
                <br />

                <span
                  className={
                    isOnlineStatus === "Online" ? "online-text" : "offlineText"
                  }
                >
                  <div
                    className={
                      isOnlineStatus === "Online" ? "dot" : "offlineDot"
                    }
                  />
                  {isOnlineStatus}
                </span>
                <span className="Availability-time">
                  Availability: Weekdays 10:30AM to 8:30PM IST
                </span>
              </div>
            </div>
          </h5>

          <div className="card-body">
            <div className="chat-box" ref={parentRef} onScroll={handleScroll}>
              {chatList &&
                chatList.map((item, value) => {
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
                                {/* <img src="/ui/Images/Vector.png" /> */}
                                <PiDownloadSimpleBold style={{color:"#2e2530",cursor:"pointer"}}/>
                              </div>
                            </p>
                            <span className="user-msg-time">
                              {" "}
                              {item.messageTime}
                            </span>
                            <span
                              className="user-msg-time"
                              style={{
                                marginLeft: "5px",
                              }}
                            >
                              {item.sendDateStatus}
                            </span>
                          </div>
                        )}
                        {item.ctOriginalDocument === null && (
                          <div className="user-msg-div">
                            <p className="user-msg">{item.ctMessage}</p>
                            <span className="user-msg-time">
                              {item.messageTime}
                            </span>
                            <span
                              className="user-msg-time"
                              style={{
                                marginLeft: "5px",
                              }}
                            >
                              {item.sendDateStatus}
                            </span>
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
                              {item.messageTime} {item.sendDateStatus}
                            </span>
                            {/* <label className="admin-msg-time"style={{ fontSize: "12px", marginLeft: "5px" }}>{item.sendDateStatus}</label> */}
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
                                  <PiDownloadSimpleBold style={{color:"white",cursor:"pointer"}}/>
                                
                                <span
                                  style={{
                                    fontSize: "15px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {String(item?.ctIsRead) === "2" && (
                                    <MdOutlineWatchLater />
                                  )}
                                  {String(item?.ctIsRead) === "0" && (
                                    <BiSend style={{ color: "white" }} />
                                  )}
                                  {String(item?.ctIsRead) === "1" && (
                                    <VscCheckAll style={{ color: "white" }} />
                                  )}
                                </span>
                              </div>
                            </p>
                          </div>
                        )}
                        {item.ctOriginalDocument === null && (
                          <div className="admin-msg-div">
                            <span className="admin-msg-time">
                              {item.messageTime} {item.sendDateStatus}
                            </span>

                            {/* <label className="admin-msg-time" style={{ fontSize: "12px", marginLeft: "-10px" }} > {item.sendDateStatus} </label> */}
                            <p className="admin-msg">
                              {item.ctMessage}
                              <span
                                style={{ fontSize: "15px", marginLeft: "5px" }}
                              >
                                {String(item?.ctIsRead) === "2" && (
                                  <MdOutlineWatchLater />
                                )}
                                {String(item?.ctIsRead) === "0" && (
                                  <BiSend style={{ color: "white" }} />
                                )}
                                {String(item?.ctIsRead) === "1" && (
                                  <VscCheckAll style={{ color: "white" }} />
                                )}
                              </span>
                            </p>
                          </div>
                        )}
                        {/* User Test */}
                        {/* {item.ctOriginalDocument === null && (
                          <div className="user-msg-div">
                            <p className="user-msg">{item.ctMessage}</p>
                            <span className="user-msg-time">
                              {item.messageTime}
                            </span>
                          </div>
                        )} */}
                        {/* User Test */}
                      </>
                    );
                  }
                })}
            </div>

            {!isScrollPositionIsDown && (
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

            {/* <form onSubmit={sendMessage}> */}
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
                      backgroundColor: "#F8F9FA",
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
                        src="/ui/Images/smile.svg"
                        className="Smile-icon"
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
                          src="/ui/Images/paperclip.svg"
                          className="PaperClip-Icon"
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
                        backgroundColor: "transparent",
                        marginTop: "3px",
                      }}
                      value={messageInputText}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage(e);
                        }
                      }}
                      onChange={(event) =>
                        setMessageInputText(event.target.value)
                      }
                      disabled={fileUpload}
                    ></input>
                    <div className="">
                      <img
                        // src="/ui/Images/download-tri.png"
                        src="/ui/Images/Send-msg.svg"
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
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};
