import React from "react";

const SentMessageCell = ({conversation}) => {
  return (
    <div className="gx-chat-item gx-flex-row-reverse">

      {/* <Avatar className="gx-size-40 gx-align-self-end" src={"https://via.placeholder.com/150"}
              alt={conversation.name}/> */}

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          {/* <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{conversation.sentAt}</div> */}
        </div>
      </div>

    </div>
  )
};

export default SentMessageCell;
