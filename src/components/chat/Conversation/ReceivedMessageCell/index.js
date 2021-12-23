import React from "react";
import Moment from 'react-moment';

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
         <Moment fromNow>{conversation.createdAt}</Moment>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
