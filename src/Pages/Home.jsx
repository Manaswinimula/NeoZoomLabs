import React from "react";
import styled, { keyframes } from "styled-components";
import image1 from "../assets/int1.jpeg";
import image4 from "../assets/bed/bed1.jpg";
import image7 from "../assets/kit1.jpg";
import image8 from "../assets/liv1.jpg";
import { useNavigate } from "react-router-dom"; 
import Services from "./Services";
import FAQ from "./FAQ";



const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;


const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6), /* Darker overlay for better text contrast */
      rgba(0, 0, 0, 0.6)
    ),
    url(${image1}) center/cover no-repeat;
  border-radius: 15px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const HeroText = styled.div`
  position: absolute;
  z-index: 10; /* Ensure text appears above the image */
  text-align: center;
  background: rgba(0,0,0,0.3); 
  color: #fff; /* White text for better contrast */
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 90%;

  h1 {
    font-size: 5rem;
    margin-bottom: 15px;
    font-family:  Brush Script MT;
    font-weight: 500;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #fff;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: black;
    background: #007bff;
    background-color:#D4F6FF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const HeroImage = styled.div`
  img {
    display: none; /* No standalone image rendering; handled by background */
  }
`;

const Section = styled.section`
  padding: 50px;
  text-align: center;
  h2 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.1rem;
    color: #555;
    margin: 0 auto;
    max-width: 600px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  width: 300px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const Home = () => {
  const navigate = useNavigate(); 

  const handleExploreClick = () => {
    navigate("/login"); 
  };

  return (
    <Wrapper>
      
      <HeroSection>
        <HeroText>
          <h1>Design that speaks to your soul</h1>
          
          <button onClick={handleExploreClick}>Explore Now</button> 
        </HeroText>
        <HeroImage>
          <img src={image1} className="d-block w-100" alt="..." />
        </HeroImage>
      </HeroSection>

      {/* Services Section */}
      <Section>
        <h2>Our Services</h2>
        <CardContainer>
          <Card>
            <img src={image8} alt="Living Room Design" />
            <h3>Living Room</h3>
            <p>Elegant and functional living spaces tailored to your style.</p>
          </Card>
          <Card>
            <img src={image4} alt="Bedroom Design" />
            <h3>Bedroom</h3>
            <p>Relax in comfort with our bespoke bedroom designs.</p>
          </Card>
          <Card>
            <img src={image7} alt="Kitchen Design" />
            <h3>Kitchen</h3>
            <p>Modern and practical kitchens that inspire creativity.</p>
          </Card>
        </CardContainer>
      </Section>

      {/* About Section */}
      <Section>
        <h2>About Us</h2>
        <p>
          We specialize in creating spaces that are not only visually stunning but
          also functional and personalized. Let us help you bring your vision to
          life.
        </p>
      </Section>
      <Services />

      <FAQ />
    </Wrapper>
  );
};

export default Home;
