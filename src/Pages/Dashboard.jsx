








// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import image1 from "../assets/int1.jpeg";
// import image2 from "../assets/int2.jpeg";
// import image3 from "../assets/int3.jpeg";
// import image4 from "../assets/bed/bed1.jpg";
// import image7 from "../assets/kit1.jpg";
// import image8 from "../assets/liv1.jpg";

// function Dashboard() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const images = [image1, image7, image8];
//   const navigate = useNavigate();

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleIndicatorClick = (index) => {
//     setCurrentIndex(index);
//   };

//   const handleCardClick = (path) => {
//     navigate(path);
//   };

//   // Automatic Scroll every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return (
//     <div>
//       <CarouselContainer>
//         <CarouselWrapper currentIndex={currentIndex}>
//           {images.map((image, index) => (
//             <Slide key={index}>
//               <img src={image} alt={`Slide ${index + 1}`} />
//             </Slide>
//           ))}
//         </CarouselWrapper>
//         <PrevButton onClick={handlePrev}>&lt;</PrevButton>
//         <NextButton onClick={handleNext}>&gt;</NextButton>
//       </CarouselContainer>
//       <Indicators>
//         {images.map((_, index) => (
//           <Indicator
//             key={index}
//             active={index === currentIndex}
//             onClick={() => handleIndicatorClick(index)}
//           />
//         ))}
//       </Indicators>

//       <CardContainer>
//         <Card onClick={() => handleCardClick("/kitchen")}>
//           <CardImage>
//             <img src={image7} alt="Kitchen Design" />
//           </CardImage>
//           <CardContent>
//             <h3>Kitchen Design</h3>
//             <p>A modern kitchen with sleek and stylish finishes.</p>
//           </CardContent>
//         </Card>
//         <Card onClick={() => handleCardClick("/bedroom")}>
//           <CardImage>
//             <img src={image4} alt="Bedroom Design" />
//           </CardImage>
//           <CardContent>
//             <h3>Bedroom Design</h3>
//             <p>A cozy bedroom with a contemporary layout and warm tones.</p>
//           </CardContent>
//         </Card>
//         <Card onClick={() => handleCardClick("/living-room")}>
//           <CardImage>
//             <img src={image8} alt="Living Room Design" />
//           </CardImage>
//           <CardContent>
//             <h3>Living Room Design</h3>
//             <p>An elegant living room with minimalist decor.</p>
//           </CardContent>
//         </Card>
//       </CardContainer>
//     </div>
//   );
// }

// export default Dashboard;

// /* Styled Components */
// const CarouselContainer = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow: hidden;
//   margin: 20px auto;
//   width: 100%;
//   max-width: 1350px;
//   height: 600px;
//   margin-top: 66px;
//   border-radius: 15px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

//   @media (max-width: 768px) {
//     height: 400px;
//   }

//   @media (max-width: 480px) {
//     height: 300px;
//   }
// `;

// const CarouselWrapper = styled.div`
//   display: flex;
//   transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
//   transition: transform 1s ease-in-out;
//   width: 100%;
// `;

// const Slide = styled.div`
//   flex: 0 0 100%;
//   height: 100%;
//   overflow: hidden;
//   border-radius: 15px;
//   position: relative;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     border-radius: 15px;
//     transition: opacity 0.5s ease-in-out;
//   }
// `;

// const PrevButton = styled.button`
//   position: absolute;
//   top: 50%;
//   left: 10px;
//   background: rgba(0, 0, 0, 0.6);
//   color: white;
//   border: none;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   cursor: pointer;
//   z-index: 10;
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background: rgba(0, 0, 0, 0.8);
//   }

//   @media (max-width: 768px) {
//     width: 40px;
//     height: 40px;
//     font-size: 20px;
//   }

//   @media (max-width: 480px) {
//     width: 35px;
//     height: 35px;
//     font-size: 18px;
//   }
// `;

// const NextButton = styled(PrevButton)`
//   left: auto;
//   right: 10px;
// `;

// const Indicators = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 10px;
// `;

// const Indicator = styled.div`
//   width: 12px;
//   height: 12px;
//   background: ${({ active }) => (active ? "#FF6347" : "lightgray")};
//   border-radius: 50%;
//   margin: 0 5px;
//   cursor: pointer;
//   transition: background 0.3s;

//   &:hover {
//     background: #FF6347;
//   }
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 30px;
//   padding: 20px;
//   background-color: #f5f5f5;

//   @media (max-width: 768px) {
//     gap: 20px;
//   }

//   @media (max-width: 480px) {
//     gap: 15px;
//   }
// `;

// const Card = styled.div`
//   position: relative;
//   width: 370px;
//   border-radius: 15px;
//   overflow: hidden;
//   background: #fff;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s, box-shadow 0.3s;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   }

//   @media (max-width: 768px) {
//     width: 320px;
//   }

//   @media (max-width: 480px) {
//     width: 250px;
//   }
// `;

// const CardImage = styled.div`
//   width: 100%;
//   height: 200px;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s;

//     ${Card}:hover & {
//       transform: scale(1.1);
//     }
//   }
// `;

// const CardContent = styled.div`
//   padding: 20px;
//   text-align: center;

//   h3 {
//     font-size: 20px;
//     font-weight: 700;
//     margin-bottom: 10px;
//     color: #333;
//   }

//   p {
//     font-size: 14px;
//     color: #666;
//     line-height: 1.6;
//   }

//   @media (max-width: 768px) {
//     h3 {
//       font-size: 18px;
//     }

//     p {
//       font-size: 13px;
//     }
//   }

//   @media (max-width: 480px) {
//     h3 {
//       font-size: 16px;
//     }

//     p {
//       font-size: 12px;
//     }
//   }
// `;




import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard