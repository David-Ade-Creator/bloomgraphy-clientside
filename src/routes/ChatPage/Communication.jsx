import React from "react";
import Conversation from "components/chat/Conversation/index";
import CustomScrollbars from "util/CustomScrollbars";
import Avatar from 'antd/lib/avatar/avatar';


const Communication = (props) => {
    const {message, selectedUser, conversation, toggleDrawer,handleMessageChange,sendMessage} = props;

    return <div className="gx-chat-main">
      <div className="gx-chat-main-header">
        <span className="gx-d-block gx-d-lg-none gx-chat-btn"><i className="gx-icon-btn icon icon-chat" onClick={toggleDrawer}/></span>
        <div className="gx-chat-main-header-info">

          <div className="gx-chat-avatar gx-mr-2">
            <div className="gx-status-pos">
              <Avatar src={selectedUser?.thumb}
                      className="gx-rounded-circle gx-size-60"
                      alt=""/>

              <span className={`gx-status gx-${selectedUser?.username}`}/>
            </div>
          </div>

          <div className="gx-chat-contact-name">
            {selectedUser?.username}
          </div>
        </div>

      </div>

      <CustomScrollbars className="gx-chat-list-scroll"scrollToBottom={true} message={conversation}>
        <Conversation conversationData={conversation}
                      selectedUser={selectedUser}/>
      </CustomScrollbars>

      <div className="gx-chat-main-footer">
        <div className="gx-flex-row gx-align-items-center" style={{maxHeight: 51}}>
          <div className="gx-col">
            <div className="gx-form-group">
                            <textarea
                              id="required" className="gx-border-0 ant-input gx-chat-textarea"
                              onChange={(e)=>{handleMessageChange(e)}}
                              value={message}
                              placeholder="Type and hit enter to send message"
                            />
            </div>
          </div>
          <i className="gx-icon-btn icon icon-sent" onClick={()=>sendMessage(message)}/>
        </div>
      </div>
    </div>
  };

  export default Communication;