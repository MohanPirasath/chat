import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import TelegramIcon from "@mui/icons-material/Telegram";
import "./MessageForm.css";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function MessageForm() {
  const [message, setMessage] = useState("");
  useEffect(()=>{
    scrollToBottom()
  },[messages])
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todaydate);
    setMessage("");
  };
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const todaydate = getFormattedDate();

  socket.off("room-messages").on("room-message", (roomMes) => {
    console.log("roomMes", roomMes);
    setMessages(roomMes);
  });
  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
}
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="message-output">
        {user ? "" : <div className="alert alert-danger">Please Login</div>}
        {user
          ? messages.map(({ _id: date, messagesByDate }, index) => {
              return (
                <div key={index}>
                  {/* <p className="alert alert-info text-center message-date-indicator">
                    {date}
                  </p> */}

                  {messagesByDate?.map(
                    ({ content, time, from: sender }, index) => {
                      return (
                        <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={index}>
                          <div className="message-inner">
                            <div className="d-flex align-items-center mb-3">
                              <img
                                src={sender.picture}
                                style={{
                                  width: 35,
                                  height: 35,
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  marginRight: 10,
                                }}
                              />
                              <p className="message-sender">
                                {sender._id == user?._id ? "You" : sender.name}
                              </p>
                            </div>
                            <p className="message-content">{content}</p>
                            <p className="message-timestamp-left">{date} {time}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })
          : ""}
          <div ref={messageEndRef}></div>
      </div>
      <Form onSubmit={handlesubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your Message"
                disabled={!user}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              disabled={!user}
              style={{ width: "4vw", backgroundColor: "#7865ff" }}
            >
              <TelegramIcon />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
