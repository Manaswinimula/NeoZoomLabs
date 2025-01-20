import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp
} from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { Link , useNavigate} from "react-router-dom";


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const ContactPage = styled.div`
  padding: 4rem 1rem;
  text-align: center;
  animation: ${fadeIn} 1.2s ease-in-out;
  margin: 0;
  margin-top: 62px;
  font-family: "Poppins", sans-serif;
  background:rgb(203, 247, 247);
  color: #333;
  min-height: 70vh; /* Ensures the page takes at least the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures proper spacing between content and footer */
`;

const ContactTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgb(32, 69, 58);
  font-weight: bold;
`;

const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
`;


const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotToggle = styled.div`
  background-color: #4facfe;
  color: white;
  padding: 1rem;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007f7f;
  }
`;

const ChatbotWindow = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatbotHeader = styled.div`
  background-color: #4facfe;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const ChatbotBody = styled.div`
  padding: 1rem;
  height: 200px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatbotMessage = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#007f7f" : "#e0e0e0")};
  color: ${({ isUser }) => (isUser ? "white" : "#333")};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
`;

const ChatbotFooter = styled.div`
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #ddd;
`;

const ChatbotInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;
`;

const ChatbotSendButton = styled.button`
  padding: 0.5rem;
  background-color: #4facfe;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #007f7f;
  }
`;

const ContactCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem; /* Adds spacing between the cards and the footer */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 300px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const ContactIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color:rgb(43, 201, 114);
  transition: color 0.3s ease;
  &:hover {
    color:rgb(31, 213, 104);
    transform: scale(1.2);
  }
`;

const ContactCardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ContactCardText = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  color: #4facfe;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #00aaff;
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
  font-size: 2rem;
  color: #4facfe;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    color: #00aaff;
    transform: scale(1.2);
  }
`;

const ContactEmail = styled.a`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #4facfe;
  transition: transform 0.3s ease, color 0.3s ease;

   &:hover {
    color: #00aaff;
    transform: scale(1.2);
  }
`

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 0.5rem;
`;




const ContactUs = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manages login state

  const navigate = useNavigate();

  useEffect(() => {
    
    const storedLoginState = localStorage.getItem("isAuthenticated");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const defaultResponses = {
    greetings: ["hello", "hi", "hey"],
    howAreYou: ["how are you", "how's it going"],
    nameQuery: ["what is your name", "who are you"],
    roomIdeas: ["living room", "bedroom", "kitchen","design","Designs"],
    contactAgent:["agent","call agent","details"]
  };

  const responseMap = {
    greetings: "Hi there! How can I assist you today?",
    howAreYou: "I'm just a bot, but I'm functioning perfectly! How about you?",
    nameQuery: "I'm your friendly chatbot here to help you.",
    roomIdeas: (
      <>
        Here are some ideas for different rooms:
        <StyledList>
          <StyledListItem>
            <span
              style={{ cursor: "pointer", color: "#007f7f", textDecoration: "underline" }}
              onClick={() =>
                isLoggedIn ? navigate("/livingroom") : navigate("/login")
              }
            >
              Living Room
            </span>
          </StyledListItem>
          <StyledListItem>
            <span
              style={{ cursor: "pointer", color: "#007f7f", textDecoration: "underline" }}
              onClick={() =>
                isLoggedIn ? navigate("/bedroom") : navigate("/login")
              }
            >
              Bedroom
            </span>
          </StyledListItem>
          <StyledListItem>
            <span
              style={{ cursor: "pointer", color: "#007f7f", textDecoration: "underline" }}
              onClick={() =>
                isLoggedIn ? navigate("/kitchen") : navigate("/login")
              }
            >
              Kitchen
            </span>
          </StyledListItem>
        </StyledList>
      </>
    ),
    contactAgent:"here's the details of an agent: Name: Harsha-7013870903",
    default: "I'm sorry, I didn't understand that. Can you please rephrase?",
  };

  const fetchBotResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase().trim();
    for (const [key, phrases] of Object.entries(defaultResponses)) {
      if (phrases.some((phrase) => normalizedInput.includes(phrase))) {
        return responseMap[key];
      }
    }
    return responseMap["default"];
  };

  const sendMessage = () => {
    if (currentMessage.trim() === "") return;

    const userMessage = { text: currentMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setCurrentMessage("");

    const botResponseText = fetchBotResponse(currentMessage);

    setMessages((prev) => [...prev, { text: botResponseText, isUser: false }]);
  };

  return (
    <ContactPage>
      <ContactTitle>Get in Touch</ContactTitle>
      <ContactSubtitle>
        We'd love to hear from you! Reach out through any of the channels below.
      </ContactSubtitle>
      <ContactCardContainer>
        <ContactCard>
        <ContactLink href="mailto:manaswinimula10@gmail.com">
          <ContactEmail>
            <FaEnvelope />
          </ContactEmail>
          </ContactLink>
          <ContactCardTitle>Email</ContactCardTitle>
          <ContactCardText>Drop us an email anytime!</ContactCardText>
        </ContactCard>

        <ContactCard>
          <ContactLink href="tel:+919704714412">
            <ContactIcon>
              <FaWhatsapp />
            </ContactIcon>
          </ContactLink>
          <ContactCardTitle>WhatsApp</ContactCardTitle>
          <ContactCardText>Chat with us for immediate assistance</ContactCardText>
        </ContactCard>

        <ContactCard>
          <SocialIcons>
            <SocialIcon
              href="https://www.instagram.com/charan__x7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="https://x.com/Sricharan000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIcon>
          </SocialIcons>
          <ContactCardTitle>Social Media</ContactCardTitle>
          <ContactCardText>
            Connect with us on our social platforms!
          </ContactCardText>
        </ContactCard>
      </ContactCardContainer>
      <ChatbotContainer>
        {!isChatOpen ? (
          <ChatbotToggle onClick={toggleChat}>Chat with us!</ChatbotToggle>
        ) : (
          <ChatbotWindow>
            <ChatbotHeader>
              Chatbot
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={toggleChat}
              >
                ✖
              </span>
            </ChatbotHeader>
            <ChatbotBody>
              {messages.map((msg, idx) => (
                <ChatbotMessage key={idx} isUser={msg.isUser}>
                  {msg.text}
                </ChatbotMessage>
              ))}
            </ChatbotBody>
            <ChatbotFooter>
              <ChatbotInput
                type="text"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <ChatbotSendButton onClick={sendMessage}>
                Send
              </ChatbotSendButton>
            </ChatbotFooter>
          </ChatbotWindow>
        )}
      </ChatbotContainer>
    </ContactPage>
  );
};

export default ContactUs;