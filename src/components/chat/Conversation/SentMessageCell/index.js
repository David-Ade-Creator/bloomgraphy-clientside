import React from "react";

const SentMessageCell = ({conversation}) => {
  return (
    <div className="gx-chat-item gx-flex-row-reverse">

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2" style={{fontSize:"0.7rem"}}>1min ago</div>
        </div>
        
      </div>

    </div>
  )
};

export default SentMessageCell;
