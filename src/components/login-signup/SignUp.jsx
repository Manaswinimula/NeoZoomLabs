

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shake = keyframes`
  10%, 90% {
    transform: translateX(-1px);
  }
  20%, 80% {
    transform: translateX(2px);
  }
  30%, 50%, 70% {
    transform: translateX(-4px);
  }
  40%, 60% {
    transform: translateX(4px);
  }
`;


const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120vh;
  margin-top: 50px;
  background-color:rgb(199, 251, 241);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SignUpContainer = styled.div`
  background-color: rgb(246, 238, 238);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 2px rgba(72, 71, 71, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${zoomIn} 0.7s ease-out;
  width: 100%;
  max-width: 400px;
 

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: rgb(118, 180, 246);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
  top: 30%;

  cursor: pointer;  
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgb(134, 6, 76);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  max-width: 300px;

  &:hover {
    background-color: rgb(207, 19, 122);
  }

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  animation: ${(props) => (props.shake ? shake : "none")} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Para = styled.p`
  font-size: 17px;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Anchortag = styled.a`
  color: blue;
  transition: color 0.3s ease;

  &:hover {
    color: darkblue;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;







const SignUp = () => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5224/api/Frontline/GetUsers/GetUserList");
        if (response.data.length > 0) {
          const maxId = Math.max(...response.data.map((u) => u.id));
          setUser((prevUser) => ({ ...prevUser, id: maxId + 1 }));
        } else {
          setUser((prevUser) => ({ ...prevUser, id: 1 }));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!user.name) newErrors.name = "Name is required.";
    if (!user.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(user.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!user.email) newErrors.email = "Email is required.";
    else if (!/@gmail\.com$/.test(user.email))
      newErrors.email = "Email must end with @gmail.com.";
    if (!user.password) newErrors.password = "Password is required.";
    else if (user.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    else if (!/[A-Z]/.test(user.password))
      newErrors.password = "Password must contain at least one uppercase letter.";
    else if (!/[a-z]/.test(user.password))
      newErrors.password = "Password must contain at least one lowercase letter.";
    else if (!/[0-9]/.test(user.password))
      newErrors.password = "Password must contain at least one digit.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(user.password))
      newErrors.password = "Password must contain at least one special character.";
    if (user.password !== user.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleTogglePasswordVisibility = (type) => {
      if (type === "password") {
        setShowPassword(true);
        setTimeout(() => setShowPassword(false), 1000);
      } else if (type === "confirmPassword") {
        setShowConfirmPassword(true);
        setTimeout(() => setShowConfirmPassword(false), 1000); 
      }
    };
  

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.get("http://localhost:5224/api/Frontline/GetUsers/GetUserList");
      const existingUser = response.data.find((u) => u.email === user.email);

      if (existingUser) {
        setErrors({ email: "Email already exists. Please use a different email." });
        return;
      }

      const newUser = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        profilePicture: "",
      };

      const registerResponse = await axios.post(
        "http://localhost:5224/api/Frontline/AddUserAync",
        newUser
      );

      if (registerResponse.status === 200) {
        navigate("/login");
      } else {
        console.error("Failed to register user!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <SignUpContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {errors.name && <ErrorText shake>{errors.name}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          {errors.phone && <ErrorText shake>{errors.phone}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && <ErrorText shake>{errors.email}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Icon onClick={() => handleTogglePasswordVisibility("password")}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </Icon>
          {errors.password && <ErrorText shake>{errors.password}</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          />
          <Icon onClick={() => handleTogglePasswordVisibility("confirmPassword")}>
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </Icon>
          {errors.confirmPassword && <ErrorText shake>{errors.confirmPassword}</ErrorText>}
        </InputContainer>


        <Button onClick={handleRegister}>Register</Button>

        <Para>
          Already have an account? <Anchortag href="/login">Click here</Anchortag>
        </Para>
      </SignUpContainer>
    </RegisterContainer>
  );
};

export default SignUp;
