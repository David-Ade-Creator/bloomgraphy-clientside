import React from "react";
import ChatUserList from "../../components/chat/ChatUserList";
import CustomScrollbars from "util/CustomScrollbars";
import Conversation from "components/chat/Conversation/index";
import "./style.less";
import users from "./data/chatUsers";
import conversationList from "./data/conversationList";
import Avatar from "antd/lib/avatar/avatar";
import { Button, Drawer, Input, Tabs } from "antd";
import ContactList from "components/chat/ContactList/index";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import Communication from "./Communication";

const TabPane = Tabs.TabPane;

function ChatPage() {
  const [loader, setLoader] = React.useState(false);
  const [conversationListState,setConversationList] = React.useState(conversationList);
  const [drawer, setDrawer] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState("No User Found");
  const [selectedSectionId, setSelectedSectionId] = React.useState("");
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(1);
  const [userState, setUserState] = React.useState(1);
  const [searchChatUser, setSearchChatUser] = React.useState("");
  const [contactList, setContactList] = React.useState(users);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [chatUsers, setChatUsers] = React.useState(users);
//   const [conversationList, setConversationList] = React.useState(users);
  const [conversation, setConversation] = React.useState(null);

  const onSelectUser = (user) => {
      console.log(user)
    // setLoader(true);
    // set(user.id);
    setConversation(conversationListState.find((data) => data.id === user.id));
    setSelectedUser(user);
    // setLoader(false);
  };

  const AppUsersInfo = () => {
    return (
      <div className="gx-chat-sidenav-main">
        <div className="gx-bg-grey-light gx-chat-sidenav-header">
          <div className="gx-chat-user-hd gx-mb-0">
            <i
              className="gx-icon-btn icon icon-arrow-left"
              onClick={() => setUserState(1)}
            />
          </div>
          <div className="gx-chat-user gx-chat-user-center">
            <div className="gx-chat-avatar gx-mx-auto">
              <Avatar
                src={"https://via.placeholder.com/150"}
                className="gx-size-60"
                alt="John Doe"
              />
            </div>

            <div className="gx-user-name h4 gx-my-2">Robert Johnson</div>
          </div>
        </div>
        <div className="gx-chat-sidenav-content">
          <CustomScrollbars className="gx-chat-sidenav-scroll">
            <div className="gx-p-4">
              <form>
                <div className="gx-form-group gx-mt-4">
                  <label>Mood</label>

                  <Input
                    fullWidth
                    id="exampleTextarea"
                    multiline
                    rows={3}
                    onKeyUp={(e) => console.log(e)}
                    onChange={(e) => console.log(e)}
                    defaultValue="it's a status....not your diary..."
                    placeholder="Status"
                    margin="none"
                  />
                </div>
              </form>
            </div>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  const ChatUsers = () => {
    return (
      <div className="gx-chat-sidenav-main">
        <div className="gx-chat-sidenav-header">
          <div className="gx-chat-user-hd">
            <div
              className="gx-chat-avatar gx-mr-3"
              onClick={() => setUserState(2)}
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
          {/*<AppBar position="static" className="no-shadow chat-tabs-header">*/}
          <Tabs className="gx-tabs-half" defaultActiveKey="1">
            <TabPane
              label={<IntlMessages id="chat.chatUser" />}
              tab={<IntlMessages id="chat.chatUser" />}
              key="1"
            >
              <CustomScrollbars className="gx-chat-sidenav-scroll-tab-1">
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
            </TabPane>
            <TabPane
              label={<IntlMessages id="chat.contacts" />}
              tab={<IntlMessages id="chat.contacts" />}
              key="2"
            >
              <CustomScrollbars className="gx-chat-sidenav-scroll-tab-2">
                {contactList.length === 0 ? (
                  <div className="gx-p-5">{userNotFound}</div>
                ) : (
                  <ContactList
                    contactList={contactList}
                    selectedSectionId={selectedSectionId}
                    onSelectUser={(e) => onSelectUser(e)}
                  />
                )}
              </CustomScrollbars>
            </TabPane>
          </Tabs>
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
                {userState === 1 ? ChatUsers() : AppUsersInfo()}
              </Drawer>
            </div>
            <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
              {userState === 1 ? ChatUsers() : AppUsersInfo()}
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
