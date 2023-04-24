import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listConversation } from "../../actions/conversationActions";
import Conversation from "../../components/public/Conversation";
import { listMessage } from "../../actions/messageActions";
import Message from "../../components/public/Message";
import { MESSAGES_CREATE_RESET } from "../../constants/messageConstants";
import { io } from "socket.io-client";
import axios from "axios";

export default function Messages() {
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [notificationCount, setNotificationCount] = useState(() => {
    return JSON.parse(localStorage.getItem("notificationCount")) || 0;
  });

  const scrollRef = useRef();
  const socket = useRef();

  const dispatch = useDispatch();

  const conversationList = useSelector((state) => state.conversationList);
  const {
    loading: listLoading,
    error: listError,
    conversationLists,
  } = conversationList;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success } = messageCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    localStorage.setItem(
      "notificationCount",
      JSON.stringify(notificationCount)
    );
  }, [notificationCount]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      setNotificationCount((prevCount) => prevCount + 1);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]) &&
      setNotificationCount((prev) => prev + 1);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo._id);
    socket.current.on("getUsers", (users) => {
      console.log({ users } + "Userrsss");
    });
  }, [userInfo]);

  // Fetch conversation list only when userInfo._id changes
  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(listConversation(userInfo._id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (currentChat && currentChat?._id) {
      dispatch(listMessage(currentChat?._id));
    }

    if (success) {
      dispatch({ type: MESSAGES_CREATE_RESET });
    }
  }, [dispatch, currentChat, success]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: userInfo._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo._id
    );

    socket.current.emit("sendMessage", {
      senderId: userInfo._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(notificationCount);
  return (
    <div className="messages">
      <div className="messages__receivers">
        <div className="messages__receivers-title">
          <h4>
            Chat{" "}
            {notificationCount > 0 && <span>({notificationCount} new)</span>}
          </h4>
        </div>
        <div className="messages__chaters">
          {listLoading
            ? "Loading"
            : listError
            ? listError
            : conversationLists.map((conversation) => {
                return (
                  <div
                    key={conversation._id}
                    onClick={() => {
                      setCurrentChat(conversation);
                      setNotificationCount(0);
                    }}
                  >
                    <Conversation
                      userId={userInfo?._id}
                      conversation={conversation}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="messages__chat">
        {currentChat ? (
          <>
            {" "}
            <div className="messages__receivers-title">
              <h4>Zilola Mamadalieva</h4>
            </div>
            <div className="messages__chatBox">
              {messages?.map((message) => {
                return (
                  <div ref={scrollRef} key={message._id}>
                    <Message
                      message={message}
                      own={message.sender === userInfo._id}
                    />
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={submitHandler}
              className="messages__chat-input"
              action=""
            >
              <input
                type="text"
                placeholder="Message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>{" "}
          </>
        ) : (
          <div className="messages__noChat">
            <span>Select user to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
}
