import React from "react";

const ReceivedMessageCell = ({ conversation, user }) => {
  return (
    <div className="gx-chat-item gx-pl-2">
      <div className="gx-bubble-block">
        <div className="gx-bubble gx-ml-0">
          <div className="gx-message">{conversation.content}</div>
          <div
          className="gx-time gx-text-muted gx-text-left gx-mt-2"
          style={{ fontSize: "0.7rem" }}
        >
          2min ago
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
