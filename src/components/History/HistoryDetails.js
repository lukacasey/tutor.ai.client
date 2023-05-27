import React, { useRef } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import "../../styles/History.css";

const HistoryDetails = ({ message, messages, setMessages }) => {
  const HOST = process.env.REACT_APP_HOST;
  const textParagraph = useRef(0);
  const { user } = useAuthContext();

  const onClick = () => {
    if (textParagraph.current.style.display === "inline") {
      textParagraph.current.style.display = "none";
    } else {
      textParagraph.current.style.display = "inline";
    }
  };

  const handleClick = async () => {
    if (!user) {
      console.log("you must be logged in");
      return;
    }

    const response = await fetch(`${HOST}/api/messages/` + message._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setMessages(messages.filter((item) => item !== message));
    } else {
      console.log("Failed to delete subject:", json.error);
    }
  };

  return (
    <div className="history-wrapper">
      <div className="message-details">
        <div className="delete-btn-cnt">
          <div
            onClick={handleClick}
            style={{ margin: "0px 0px 10px 0px" }}
            className="delete-btn"
          >
            &#10006;
          </div>
        </div>
        <div onClick={onClick} className="test-123">
          <p style={{ color: "#e5c07b" }} className="userMessage">
            {message.userMessage}
          </p>
          <p ref={textParagraph} className="gpt-msg-hist">
            {message.aiMessage}
          </p>
          <p
            style={{ color: "#61afef", marginTop: "10px" }}
            className="hist-date"
          >
            {" "}
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
