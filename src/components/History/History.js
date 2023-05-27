import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogNav from "../LogNav";
import { useAuthContext } from "../hooks/useAuthContext";
import "../../styles/History.css";

import HistoryDetails from "../History/HistoryDetails";

export default function History() {
  const HOST = process.env.REACT_APP_HOST;
  let { subject } = useParams();
  const [messages, setMessages] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${HOST}/api/messages`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setMessages(json);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  return (
    <>
      <LogNav />
      <div className="history">
        <h1 className="history-title ht2">Chat History</h1>
        <h1 style={{ color: "#61afef" }} className="history-title">
          {subject}
        </h1>

        <div className="messages">
          {messages &&
            messages
              .filter((message) => message.subject === subject)
              .map((message) => (
                <HistoryDetails
                  key={message._id}
                  message={message}
                  messages={messages}
                  setMessages={setMessages}
                />
              ))}
        </div>
      </div>
    </>
  );
}
