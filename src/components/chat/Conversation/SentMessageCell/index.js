import React from "react";
import Moment from 'react-moment';

const SentMessageCell = ({conversation}) => {
  return (
    <div className="gx-chat-item gx-flex-row-reverse gx-pr-2">

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2" style={{fontSize:"0.7rem"}}>
          <Moment fromNow>{conversation.createdAt}</Moment>
          </div>
        </div>
        
      </div>

    </div>
  )
};

export default SentMessageCell;
