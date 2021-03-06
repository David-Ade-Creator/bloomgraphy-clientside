import React from "react";
import { useSelector } from "react-redux";
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";

const Conversation = ({conversationData, selectedUser}) => {
  const authUser = useSelector(({ auth }) => auth.authUser);
  return (
    <div className="gx-chat-main-content gx-pb-3 gx-pr-0 gx-pl-0">
      {conversationData?.map((conversation) => conversation.sender.username === authUser.username ?
        <SentMessageCell key={conversation.id} conversation={conversation}/> :
        <ReceivedMessageCell key={conversation.id} conversation={conversation} user={selectedUser}/>
      )}
    </div>
  )
};

export default Conversation;
