import React from "react";
import UserCell from "./UserCell/index";

const ChatUserList = ({chatUsers, selectedSectionUsername, onSelectUser}) => {
  return (
    <div className="gx-chat-user">
      {chatUsers.map((chat, index) =>
        <UserCell key={index} chat={chat} selectedSectionUsername={selectedSectionUsername} onSelectUser={onSelectUser}/>
      )}
    </div>
  )
};

export default ChatUserList;
