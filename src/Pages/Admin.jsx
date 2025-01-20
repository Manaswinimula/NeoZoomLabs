import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";


// Zoom-in animation for the container
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

// Shake animation for error messages
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



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const LoginContainer = styled.div`
  background-color: rgb(246, 238, 238);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 2px rgba(72, 71, 71, 0.3);
  animation: ${zoomIn} 0.7s ease-out;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    padding: 15px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgb(118, 180, 246);
    box-shadow: 0 4px 8px rgba(118, 180, 246, 0.5);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: rgb(207, 19, 122);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  animation: ${(props) => (props.shake ? shake : "none")} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SignCont = styled.div`
  display: flex;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    text-align: center;
  }
`;

const Para = styled.p`
  margin-right: 10px;
`;

const Anchortag = styled.a`
  color: blue;
  transition: color 0.3s ease;

  &:hover {
    color: darkblue;
  }
`;

const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;

  input {
    width: 100%;
  }

  .icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    input {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    input {
      font-size: 14px;
    }
  }
`;



const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }
  };


  const togglePasswordVisibilityWithTimer = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 1000); 
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!formData.email) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(formData.email)) {
        setEmailError("Please enter a valid email address.");
        isValid = false;
      }
    }

    if (!formData.password) {
      setPasswordError("Please enter your password.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5224/api/Frontline/GetUsers/GetUserList`
      );

      const user = response.data.find(
        (user) => user.email === formData.email
      );

      if (!user) {
        setEmailError("Email does not exist.");
        return;
      }

      if (user.password !== formData.password) {
        setPasswordError("Incorrect password.");
        return;
      }

      localStorage.setItem("useremail", formData.email);
      login(user);
      navigate("/dashboard", { state: { email: formData.email } });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <LoginContainer>
        <form onSubmit={handleLogin}>
          <Field>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
            {emailError && <ErrorText shake>{emailError}</ErrorText>}
          </Field>


          <Field>
            <PasswordContainer>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                className="icon"
                onClick={togglePasswordVisibilityWithTimer}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </PasswordContainer>
            {passwordError && <ErrorText shake>{passwordError}</ErrorText>}
          </Field>


          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <SignCont>
            <Para>Don't have an Account</Para>
            <Anchortag href="signup">Click here</Anchortag>
          </SignCont>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default Login;
