import React from "react";
import Conversation from "components/chat/Conversation/index";
import CustomScrollbars from "util/CustomScrollbars";
import Avatar from 'antd/lib/avatar/avatar';


const Communication = (props) => {
    const {message, selectedUser, conversation, toggleDrawer} = props;


    console.log(selectedUser?.thumb);

    return <div className="gx-chat-main">
      <div className="gx-chat-main-header">
        <span className="gx-d-block gx-d-lg-none gx-chat-btn"><i className="gx-icon-btn icon icon-chat" onClick={toggleDrawer}/></span>
        <div className="gx-chat-main-header-info">

          <div className="gx-chat-avatar gx-mr-2">
            <div className="gx-status-pos">
              <Avatar src={selectedUser?.thumb}
                      className="gx-rounded-circle gx-size-60"
                      alt=""/>

              <span className={`gx-status gx-${selectedUser?.status}`}/>
            </div>
          </div>

          <div className="gx-chat-contact-name">
            {selectedUser?.name}
          </div>
        </div>

      </div>

      <CustomScrollbars className="gx-chat-list-scroll">
        <Conversation conversationData={conversation.conversationData}
                      selectedUser={selectedUser}/>
      </CustomScrollbars>

      <div className="gx-chat-main-footer">
        <div className="gx-flex-row gx-align-items-center" style={{maxHeight: 51}}>
          <div className="gx-col">
            <div className="gx-form-group">
                            <textarea
                              id="required" className="gx-border-0 ant-input gx-chat-textarea"
                              onKeyUp={(e)=>{console.log(e)}}
                              onChange={(e)=>{console.log(e)}}
                              value={message}
                              placeholder="Type and hit enter to send message"
                            />
            </div>
          </div>
          <i className="gx-icon-btn icon icon-sent" onClick={(e)=>{console.log(e)}}/>
        </div>
      </div>
    </div>
  };

  export default Communication;