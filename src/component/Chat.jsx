import React, { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messagesSlice";
import { SocketContext } from "../SocketContext";
import { BiSend } from "react-icons/bi";
import "./Chat.css";

function Chat({ appointmentId, onmessageSend }) {
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.auth.user);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;
    if (!socket.connected) socket.connect();
    socket.emit("joinRoom", { appointmentId });
    console.log(`Joined room: ${appointmentId}`);

    dispatch(fetchMessages(appointmentId));

    socket.on("receiveMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      dispatch(newMessageReceived(newMessage));
    });

    const intervalid = setInterval(() => {
      dispatch(fetchMessages(appointmentId));
    }, 1000);

    return () => {
      socket.emit("leaveRoom", { appointmentId });
      socket.off("receiveMessage");
      clearInterval(intervalid);
    };
  }, [appointmentId, socket, dispatch]);

  useEffect(() => {
    scrollToButtom();
  }, [messages]);

  const scrollToButtom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        appointmentId,
        sender: user.userId,
        content: message,
      };
      console.log("Sending message:", newMessage);

      try {
        const response = await fetch(
          "https://vet-backend-m3o7.onrender.com/api/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
            credentials: "include",
          }
        );

        if (response.ok) {
          const savedMessage = await response.json();
          console.log("Message saved successfully:", savedMessage);

          dispatch(newMessageReceived(savedMessage));

          socket.emit("sendMessage", newMessage);

          setMessage("");
        } else {
          const error = await response.json();
          console.error("Failed to save message:", error);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={
              msg.sender === user.userId ? "my-message" : "other-message"
            }
          >
            <p>{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <BiSend onClick={handleSendMessage} size={34} color="#ff9a3c" />
      </div>
    </div>
  );
}

export default Chat;
