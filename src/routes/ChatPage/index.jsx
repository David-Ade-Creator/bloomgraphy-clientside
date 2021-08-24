import React from "react";
import ChatUserList from "../../components/chat/ChatUserList";
import CustomScrollbars from "util/CustomScrollbars";
import "./style.less";
import users from "./data/chatUsers";
import conversationList from "./data/conversationList";
import Avatar from "antd/lib/avatar/avatar";
import { Button, Drawer, Input } from "antd";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import Communication from "./Communication";

// when user click on chat with another user, first add this user already fetched array of user and then fetch the conversation
// between both users and display this on the communication phase of the application.
// last seen and last text 

function ChatPage() {
  const [loader, setLoader] = React.useState(false);
  const [conversationListState,setConversationList] = React.useState(conversationList);
  const [drawer, setDrawer] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState("No User Found");
  const [selectedSectionId, setSelectedSectionId] = React.useState("");
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(1);
  const [userState, setUserState] = React.useState(1);
  const [contactList, setContactList] = React.useState(users);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [chatUsers, setChatUsers] = React.useState(users);
  const [conversation, setConversation] = React.useState(null);

  const onSelectUser = (user) => {
    setLoader(true);
    console.log(user);
    setConversation(conversationListState.find((data) => data.id === user.id));
    setSelectedUser(user);
    setLoader(false);
  };

  const ChatUsers = () => {
    return (
      <div className="gx-chat-sidenav-main">
        <div className="gx-chat-sidenav-header">
          <div className="gx-chat-user-hd">
            <div
              className="gx-chat-avatar gx-mr-3"
            >
              <div className="gx-status-pos">
                <Avatar
                  id="avatar-button"
                  src={"https://via.placeholder.com/150"}
                  className="gx-size-50"
                  alt=""
                />
                <span className="gx-status gx-online" />
              </div>
            </div>

            <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
              <div className="gx-module-title">
                <h5 className="gx-mb-0">Robert Johnson</h5>
              </div>
              <div className="gx-module-user-detail">
                <span className="gx-text-grey gx-link">robert@example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gx-chat-sidenav-content">
           <CustomScrollbars className="gx-chat-sidenav-scroll-tab-2">
                {chatUsers.length === 0 ? (
                  <div className="gx-p-5">{userNotFound}</div>
                ) : (
                  <ChatUserList
                    chatUsers={chatUsers}
                    selectedSectionId={selectedSectionId}
                    onSelectUser={(e) => onSelectUser(e)}
                  />
                )}
              </CustomScrollbars>
        </div>
      </div>
    );
  };

  const showCommunication = () => {
      
    return (
      <div className="gx-chat-box">
        {selectedUser === null ? (
          <div className="gx-comment-box">
            <div className="gx-fs-80">
              <i className="icon icon-chat gx-text-muted" />
            </div>
            <h1 className="gx-text-muted">
              {<IntlMessages id="chat.selectUserChat" />}
            </h1>
            <Button
              className="gx-d-block gx-d-lg-none"
              type="primary"
              onClick={() => setDrawer(!drawer)}
            >
              {<IntlMessages id="chat.selectContactChat" />}
            </Button>
          </div>
        ) : (
          <Communication User={selectedUser} message={message} conversation={conversation} toggleDrawer={()=>{setDrawer(!drawer)}}/>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="gx-main-content">
        <div className="gx-app-module gx-chat-module">
          <div className="gx-chat-module-box">
            <div className="gx-d-block gx-d-lg-none">
              <Drawer
                placement="left"
                closable={false}
                visible={drawer}
                onClose={() => setDrawer(!drawer)}
              >
                {ChatUsers()}
              </Drawer>
            </div>
            <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
               {ChatUsers()}
            </div>
            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : (
              showCommunication()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
