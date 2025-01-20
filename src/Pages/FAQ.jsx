import React, { useState } from "react";
import styled from "styled-components";


const FAQContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color:rgb(236, 218, 251);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FAQHeading = styled.h1`
  text-align: center;
  font-family: "Bodoni Moda", serif;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const QuestionItem = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
`;

const Question = styled.div`
  padding: 15px;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;

  &:hover {
    background-color:rgb(247, 217, 217);
  }
`;

const Answer = styled.div`
  padding: 15px;
  font-family: "Raleway", sans-serif;
  font-size: 0.9rem;
  color: #555;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const ToggleIcon = styled.span`
  font-size: 1.2rem;
  color: #888;
`;


const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "What services does your interior design company provide?",
      answer:
        "We provide a range of services including space planning, furniture selection, color consultation, and custom designs tailored to your needs.",
    },
    {
      question: "How long does a typical interior design project take?",
      answer:
        "The duration of a project depends on its complexity. Smaller projects may take 4-6 weeks, while larger ones can take several months.",
    },
    {
      question: "Do you offer consultations before starting a project?",
      answer:
        "Yes, we offer initial consultations to understand your vision and discuss the scope of your project.",
    },
    {
      question: "Can I incorporate my own ideas and preferences?",
      answer:
        "Absolutely! We work closely with clients to ensure their preferences and ideas are reflected in the final design.",
    },
    {
      question: "What is the cost of your interior design services?",
      answer:
        "Our pricing varies based on the scope of the project. Contact us for a personalized quote tailored to your requirements.",
    },
  ];

  return (
    <FAQContainer>
      <FAQHeading>Frequently Asked Questions</FAQHeading>
      {faqData.map((item, index) => (
        <QuestionItem key={index}>
          <Question onClick={() => toggleQuestion(index)}>
            {item.question}
            <ToggleIcon>{openQuestions[index] ? "-" : "+"}</ToggleIcon>
          </Question>
          {openQuestions[index] && <Answer>{item.answer}</Answer>}
        </QuestionItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
