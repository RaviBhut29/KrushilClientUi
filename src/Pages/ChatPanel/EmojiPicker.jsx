import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { Button, Modal } from "antd";
import "./Chat.css";

const EmojiPicker = ({emojiModalOpen, setEmojiModalOpen,messageInputText,setMessageInputText}) => {

  const onEmojiClick = (event, emojiObject) => {
    setMessageInputText(messageInputText + event.emoji);
  };

  return (
    <>
      {/* <Modal
        title=""
        centered
        open={emojiModalOpen}
        onOk={() => setEmojiModalOpen(false)}
        onCancel={() => setEmojiModalOpen(false)}
        footer={""}
        className="EmojiModal"
      > */}
        <div>
          <Picker onEmojiClick={onEmojiClick} className="EmojiModal"/>
        </div>
      {/* </Modal> */}
    </>
  );
};

export default EmojiPicker;
