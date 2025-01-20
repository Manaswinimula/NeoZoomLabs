

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram , FaCopyright} from "react-icons/fa";

// Styled Components

const FooterContainer = styled.footer`
  background-color: #333333;
  color: #e4e4e4;
  padding: 40px 0;
  margin-top: 80px;

  @media (max-width: 768px) {
    padding: 30px 0;
    margin-top: 60px;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
    margin-top: 40px;
  }
`;

const FooterTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const FooterTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 80%;
  margin-bottom: -30px;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const Line = styled.span`
  height: 1px;
  background-color: #333333;
  flex: 1;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.span`
  font-family: "Bodoni Moda", serif;
  font-size: 1.5rem;
  color: #333333;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 80px;
  gap: 80px;

  @media (max-width: 768px) {
    padding: 0 40px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 0 20px;
    gap: 20px;
  }
`;

const Brand = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const FooterHeading = styled.h6`
  font-family: "Bodoni Moda", serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
  color: #e4e4e4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const FooterLink = styled(Link)`
  color: #bdbdbd;
  text-decoration: none;
  font-family: "Raleway", sans-serif;
  font-size: 0.875rem;

  &:hover {
    color: #00cccc;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  a {
    color: #e4e4e4;
    font-size: 1.2rem;

    &:hover {
      color: #00cccc;
    }
  }
`;

const FooterContainerOuter = styled.footer`
  font-style: "Roboto";
`;


const CopyrightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 1rem;
  color: #bdbdbd;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 15px;
  }
`;


function Footer() {
  return (
    <FooterContainerOuter>
      <FooterTitleWrapper>
        <FooterTitleContainer>
          <Line />
          <Title>FrontLine Design where design mets the creation!</Title>
          <Line />
        </FooterTitleContainer>
      </FooterTitleWrapper>
      <FooterContainer>
        <FooterContent>
          <Brand>
            <FooterHeading>interior-design</FooterHeading>
            <SocialIcons>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </SocialIcons>
          </Brand>
          <Nav>
            <FooterHeading>Services</FooterHeading>
            <FooterLink>Branding</FooterLink>
            <FooterLink>Design</FooterLink>
            <FooterLink>Marketing Us</FooterLink>
            <FooterLink>Advertisement</FooterLink>
          </Nav>
          <Nav>
            <FooterHeading>Company</FooterHeading>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contactus">Contact</FooterLink>
          </Nav>
          <Nav>
            <FooterHeading>Legal</FooterHeading>
            <FooterLink to="/terms">Terms of Use</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
          </Nav>
        </FooterContent>
        <CopyrightContainer>
          <FaCopyright style={{ marginRight: "8px" }} />
          <span>2025 FrontLine Design. All rights reserved.</span>
        </CopyrightContainer>
      </FooterContainer>
    </FooterContainerOuter>
  );
}


export default Footer;

