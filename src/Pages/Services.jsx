
import React from 'react'
import styled from 'styled-components'

const OutContainer = styled.div`
    width: 100%;
    height: 90vh;
    background-color: rgb(202, 254, 238);  
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 20px;
    h1 {
        font-weight: bold;
        color: rgb(32, 69, 58);
        margin-bottom: 30px;
    }

    /* Media query for tablet and mobile screens */
    @media (max-width: 768px) {
        background-color: rgb(240, 248, 255); 
        padding-top: 30px;  
    }

    @media (max-width: 480px) {
        background-color: rgb(255, 250, 230);  
        padding-top: 20px;  
    }
`

const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;  
    @media (max-width: 768px) {
        flex-direction: column; 
        align-items: center;    
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    margin: 8px;
    padding: 20px;
    width: 350px;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);

    h3 {
        margin-bottom: 15px;
    }

    li {
        margin-left:20px;
        margin-bottom: 10px;
        font-size: 16px;
    }

    @media (max-width: 768px) {
        width: 90%;         
        padding: 15px;      
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        width: 100%;        
        margin-bottom: 15px;
        padding: 12px;      
    }
`

function Services() {
  return (
    <>
        <OutContainer>
            <h1>What we offer</h1>
            <Cards>
                <CardContainer>
                    <h3>Our Services</h3>
                    <ul>
                        <li>Modular Kitchens</li>
                        <li>Modular Wardrobes</li>
                        <li>Lighting</li>
                        <li>Flooring</li>
                        <li>Electrical Work</li>
                        <li>Civil Work</li>
                        <li>False Ceiling</li>
                    </ul>
                </CardContainer>
                <CardContainer>
                    <h3>Warranty</h3>
                    <ul>
                        <li>Flat 10-year Warranty - Stay worry free with our warranty policy on modular products</li>
                        <li>Up to 1-year on-site service warranty - warranty on on-site services such as painting, electrical, and more...</li>
                    </ul>
                </CardContainer>
                <CardContainer>
                    <h3>Price benefits</h3>
                    <ul>
                        <li>Price-match guarantee - Price match to a valid quote in comparison with a branded player and for exact scope</li>
                        <li>Flexible payment options - EMI solutions and payment schemes from leading financial partners</li>
                        <li>No hidden costs - Transparent costing without last-minute additions.</li>
                    </ul>
                </CardContainer>
            </Cards>
        </OutContainer>
    </>
  )
}

export default Services
