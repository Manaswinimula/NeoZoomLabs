import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";


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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:rgb(181, 247, 223);
  padding: 20px;
`;

const LoginContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${zoomIn} 0.7s ease-out;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  background: #f9f9f9;

  &:hover {
    transform: translateY(-3px);
    border-color: rgb(6, 78, 93);;
  }
  &:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 4px 8px rgba(106, 17, 203, 0.5);
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
  padding: 12px;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #e52e71, #ff8a00);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(229, 46, 113, 0.5);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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
  color: #6a11cb;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2575fc;
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
        `http://localhost:3000/users`
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
        </form>
      </LoginContainer>
    </Container>
  );
};

export default Login;

