// https://www.youtube.com/watch?v=Lag9Pj_33hM&ab_channel=CooperCodes
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import "../../styles/Tutor.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const HOST = process.env.REACT_APP_HOST;

export default function TutorBrain() {
  const { user } = useAuthContext();
  let { subject } = useParams();

  // usestate for history
  const [userMessage, setUserMessage] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [error, setError] = useState(null);
  // ^^^

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Greetings! I'm tutor.ai! How can I help you learn?",
      sender: "ChatGPT",
    },
  ]);

  // button 1
  const [isChecked, setIsChecked] = useState(false);

  // button 2
  const [isChecked2, setIsChecked2] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    let systemMessages = [];

    let systemMessage = {
      role: "system",
      content: "",
    };

    systemMessages.push(systemMessage);

    if (isChecked) {
      systemMessages = [];
      systemMessage = {
        role: "system",
        content: "What should i change or include to make this better?",
      };
      systemMessages.push(systemMessage);
    }

    if (isChecked2) {
      systemMessages = [];
      systemMessage = {
        role: "system",
        content: "Give me a few multiple choice questions on the following:",
      };
      systemMessages.push(systemMessage);
    }

    if (!isChecked && !isChecked2) {
      systemMessages = [];
      systemMessage = {
        role: "system",
        content:
          "I HAVE THREE REQUIREMENTS WHEN RESPONDING TO MY PROMPT. 1. DO NOT ANSWER THE QUESTION UNDER ANY CERCUMSTANCES. 2. GIVE ME RESOURCES (IN THE FORM OF URL LINKS) WHERE I CAN LEARN ABOUT THE FOLLOWING TOPIC. 3. DO NOT WRITE ESSAYS. MY PROMPT IS THE FOLLOWING: ",
      };
      systemMessages.push(systemMessage);
    }

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [...systemMessages, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);

        // code for history section
        const userMessage = chatMessages[chatMessages.length - 1].message;
        const aiMessage = data.choices[0].message.content;
        setUserMessage(userMessage);
        setAiMessage(aiMessage);

        handleSubmit(userMessage, aiMessage);
      });
  }

  const handleSubmit = async (userMessage, aiMessage) => {
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const message = {
      userMessage,
      aiMessage,
      subject,
    };

    const response = await fetch(`${HOST}/api/messages`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setUserMessage("");
      setAiMessage("");
      setError(null);
    }
  };

  return (
    <>
      <div
        className="tutor-container"
        style={{
          position: "relative",
          height: "600px",
          // width: "1300px",
          // marginTop: "70px",
        }}
      >
        <div className="account-heading-wrapper">
          <h1 className="account-heading1">{subject}</h1>
        </div>
        <MainContainer style={{ border: "none" }}>
          <ChatContainer>
            <MessageList
              style={{ backgroundColor: "#282c34" }}
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator
                    style={{ backgroundColor: "#282c34" }}
                    content="tutor.ai is thinking... may take up to 10 second..."
                  />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              style={{ backgroundColor: "#282c34", border: "none" }}
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
        <div className="topping">
          <input
            type="radio"
            id="default-settings"
            name="settings"
            value="default"
            checked={!isChecked && !isChecked2}
            onChange={() => {
              setIsChecked(false);
              setIsChecked2(false);
            }}
          />
          <p>Default Settings</p>
          <input
            type="radio"
            id="feedback"
            name="settings"
            value="feedback"
            checked={isChecked}
            onChange={() => {
              setIsChecked(true);
              setIsChecked2(false);
            }}
          />
          <p>Feedback</p>
          <input
            type="radio"
            id="multiple-choice"
            name="settings"
            value="settings"
            checked={isChecked2}
            onChange={() => {
              setIsChecked(false);
              setIsChecked2(true);
            }}
          />
          <p>Muliple choice</p>
        </div>
      </div>
    </>
  );
}
