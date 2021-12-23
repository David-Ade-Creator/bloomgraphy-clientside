import React from "react";
import { useSelector } from "react-redux";
import ChatUserList from "../../components/chat/ChatUserList";
import CustomScrollbars from "util/CustomScrollbars";
import "./style.less";
import Avatar from "antd/lib/avatar/avatar";
import { Button, Drawer } from "antd";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import Communication from "./Communication";
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import {
  GET_CHAT_MEMBERS,
  GET_MESSAGES,
  GET_USER_PROFILE,
} from "../../graphql/queries";
import { SEND_MESSAGE } from "../../graphql/mutations";
import { NEW_MESSAGE, UPDATED_CHATUSERS } from "../../graphql/subscription";

// when user click on chat with another user, first add this user already fetched array of user and then fetch the conversation
// between both users and display this on the communication phase of the application.
// last seen and last text

function ChatPage(props) {
  const chatRecipient = props.match.params.username;
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [loader, setLoader] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [userNotFound] = React.useState("No User Found");
  const [selectedSectionId, setSelectedSectionId] = React.useState();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [chatUsers, setChatUsers] = React.useState(null);
  const [conversation, setConversation] = React.useState(null);

  console.log(conversation);

  const { loading: loadingUsers, data: chatMemberwithUsername } = useQuery(
    GET_CHAT_MEMBERS,
    {
      onCompleted: () => {
        setChatUsers(chatMemberwithUsername?.getChatUsers);
        if(chatRecipient){
        getChatRecipient();
        }
      },
    }
  );

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  const { data: updatedUsersData, error: updatedUsersError } = useSubscription(
    UPDATED_CHATUSERS
  );

  React.useEffect(() => {
    if (updatedUsersError) console.log(updatedUsersError);
    if (updatedUsersData) {
      let refreshedUsers = updatedUsersData?.updatedChatUsers.filter(
        (updatedUser) => updatedUser.username !== authUser.username
      );
      refreshedUsers = [...refreshedUsers, ...chatUsers];
      refreshedUsers = refreshedUsers.filter(
        (singleMember, index, self) =>
          index === self.findIndex((m) => m.username === singleMember.username)
      );
      setChatUsers(refreshedUsers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedUsersData, updatedUsersError]);

  const [
    getChatRecipient,
    { data: addedUser, loading: loadingUser },
  ] = useLazyQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { username: chatRecipient },
    onCompleted: () => {
      onSelectUser(addedUser?.getProfile);
      if (chatUsers === 0) {
        setChatUsers([addedUser?.getProfile, ...chatUsers]);
      } else {
        const alreadyExist = chatUsers.find(
          (user) => user.username === addedUser?.getProfile?.username
        );
        if (!alreadyExist) {
          setChatUsers([addedUser?.getProfile, ...chatUsers]);
        }
      }
    },
  });

  const { data: loggedinUser } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: "network-only",
    variables: { username: authUser.username },
    onCompleted: () => {
      setCurrentUser(loggedinUser?.getProfile);
    },
  });

  React.useEffect(() => {
    if (messageError) console.log(messageError);
    if (messageData?.newMessage) {
      if (
        messageData?.newMessage.sender.id === selectedUser.id &&
        messageData?.newMessage.receiver.id === authUser?.id
      ) {
        setConversation([...conversation, messageData?.newMessage]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageError, messageData?.newMessage, selectedUser]);

  const [loadMessages] = useLazyQuery(GET_MESSAGES, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setConversation(data?.getMessages);
      setLoader(false);
    },
  });

  const [sendUserMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      let message = data?.sendMessage;
      setConversation([...conversation, message]);
      setMessage("");
    },
  });

  const onSelectUser = (user) => {
    setLoader(true);
    setSelectedSectionId(user.id);
    loadMessages({ variables: { recipient: user.username } });
    setSelectedUser(user);
  };

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const sendMessage = (message) => {
    sendUserMessage({
      variables: { content: message, receiverId: selectedSectionId },
    });
  };

  const ChatUsers = () => {
    return loadingUsers && loadingUser ? (
      <CircularProgress />
    ) : (
      <div className="gx-chat-sidenav-main">
        <div className="gx-chat-sidenav-header">
          <div className="gx-chat-user-hd">
            <div className="gx-chat-avatar gx-mr-3">
              <div className="gx-status-pos">
                {currentUser && currentUser?.photo ? (
                  <Avatar
                    id="avatar-button"
                    src={currentUser?.photo}
                    className="gx-size-50"
                    alt=""
                  />
                ) : (
                  <Avatar id="avatar-button" className="gx-size-50">
                    {currentUser?.firstName.substring(0, 2).toUpperCase()}
                  </Avatar>
                )}
              </div>
            </div>

            <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
              <div className="gx-module-title">
                <h5 className="gx-mb-0">
                  {currentUser?.firstName + " " + currentUser?.lastName}
                </h5>
              </div>
              <div className="gx-module-user-detail">
                <span className="gx-text-grey gx-link">
                  {currentUser?.username}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="gx-chat-sidenav-content">
          <CustomScrollbars className="gx-chat-sidenav-scroll-tab-2">
            {chatRecipient ? !loadingUser ? chatUsers.length === 0 ? (
              <div className="gx-p-5">{userNotFound}</div>
            ) : (
              <ChatUserList
                chatUsers={chatUsers}
                selectedSectionId={selectedSectionId}
                onSelectUser={(e) => onSelectUser(e)}
              />
            ) : <CircularProgress/> : chatUsers.length === 0 ? (
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
          <Communication
            User={selectedUser}
            message={message}
            selectedUser={selectedUser}
            sendMessage={sendMessage}
            handleMessageChange={handleMessageChange}
            conversation={conversation}
            toggleDrawer={() => {
              setDrawer(!drawer);
            }}
          />
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
                {chatUsers && ChatUsers()}
              </Drawer>
            </div>
            <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
            {chatUsers && ChatUsers()}
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
