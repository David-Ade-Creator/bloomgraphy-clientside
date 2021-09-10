import React from "react";
import {Avatar} from "antd";

const UserCell = ({chat, selectedSectionUsername, onSelectUser}) => {
  return (
    <div className={`gx-chat-user-item ${selectedSectionUsername === chat.username ? 'active' : ''}`} onClick={() => {
      onSelectUser(chat);
    }}>
      <div className="gx-chat-user-row">
        <div className="gx-chat-avatar">
          <div className="gx-status-pos">
            <Avatar src={chat.thumb} className="gx-size-40" alt={chat.username}/>
          </div>
        </div>

        <div className="gx-chat-info">
          <span className="gx-name h4">{`${chat.firstName + " " + chat.lastName} (${chat.username})`}</span>
          <div className="gx-chat-info-des gx-text-truncate">{`${'This should be our lastmessage substring i think'.substring(0, 25)}...`}</div>
          {/* <div className="gx-last-message-time">{chat.lastMessageTime}</div> */}
        </div>

        {/* {chat.unreadMessage > 0 ? <div className="gx-chat-date">
          <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">{chat.unreadMessage}</div>
        </div> : null} */}
      </div>
    </div>
  )
};

export default UserCell;
