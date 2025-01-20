
import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the animation
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

// Styled components for the About Us page
const AboutUsPage = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  animation: ${fadeIn} 1.2s ease-in-out;
  margin: 0;
  margin-top: 62px;
  font-family: "Poppins", sans-serif;
  background: rgb(203, 247, 247);
  color: #333;
  min-height: 100vh; /* Ensures the page takes at least the full viewport height */
  display: flex;
  flex-direction: column;
`;

const AboutUsTitle = styled.h1`
  font-size: 2.5rem;
  color: rgb(32, 69, 58);
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const AboutUsDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
`;

const AboutUsContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap; /* Ensures cards wrap on smaller screens */
  margin-bottom: 3rem; /* Adds spacing between the cards and the footer */
`;

const AboutSection = styled.div`
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
    width: 90%; /* Ensures the cards take most of the width on smaller screens */
  }
`;

const AboutSectionTitle = styled.h2`
  font-size: 1.5rem;
  color:rgb(11, 49, 67);
  margin-bottom: 10px;
`;

const AboutSectionParagraph = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

function About() {
  return (
    <AboutUsPage>
      <AboutUsTitle>About Us</AboutUsTitle>
      <AboutUsDescription>
        Welcome to Frontline! We are committed to delivering exceptional products
        and services tailored to meet your needs.
      </AboutUsDescription>
      <AboutUsContent>
        <AboutSection>
          <AboutSectionTitle>Our Mission</AboutSectionTitle>
          <AboutSectionParagraph>
            To provide outstanding value to our customers through innovation and dedication.
          </AboutSectionParagraph>
        </AboutSection>
        <AboutSection>
          <AboutSectionTitle>Our Vision</AboutSectionTitle>
          <AboutSectionParagraph>
            To be a leader in our industry, known for integrity and excellence.
          </AboutSectionParagraph>
        </AboutSection>
        <AboutSection>
          <AboutSectionTitle>Why Choose Us?</AboutSectionTitle>
          <AboutSectionParagraph>
            Our passion for quality and commitment to customer satisfaction set us apart.
          </AboutSectionParagraph>
        </AboutSection>
      </AboutUsContent>
    </AboutUsPage>
  );
}

export default About;
