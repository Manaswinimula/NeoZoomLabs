

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";


const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-top: 15px;
  color: #4f4f4f;
  font-size: 19px;
`;
const Heading = styled.h1`
  font-size: 32px;
  color: #333;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: capitalize;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 17px;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;

  &:focus {
    border-color: #63cdda;
    box-shadow: 0 0 6px rgba(99, 205, 218, 0.5);
    outline: none;
  }
`;
const InfoText = styled.p`
  margin: 10px 0;
  color: #555;
  font-size: 18px;
  font-weight: 500;
`;
const ProfileImage = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f3f3f3, #e0e0e0);
  color: #2e2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  cursor: pointer;
  overflow: hidden;
  border: 4px solid #a7d8f5;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    border-color: #63cdda;
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 20px;

  &:hover {
    color: #63cdda;
  }
`;

const PenIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;



const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;
const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 2% auto;
  margin-top:100px;
  padding: 30px;
  background: linear-gradient(to top, #f0f4f7,rgb(169, 248, 215));
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Arial', sans-serif;
`;
const Button = styled.button`
  padding: 14px 28px;
  background: linear-gradient(145deg, #63cdda, #3b9bb5);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px 10px 0;
  transition: background 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(145deg, #3b9bb5, #63cdda);
  }
`;

const DeleteButton = styled(Button)`
  background: linear-gradient(145deg, #f76c6c, #e63946);
  
  &:hover {
    background: linear-gradient(145deg, #e63946, #f76c6c);
  }
`;

const RemoveImageButton = styled(Button)`
  background-color:red;
  color: white;
  &:hover {
    background-color:rgb(212, 42, 23);
    color:white;
  }
`
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const SuccessMessage = styled.div`
  color: #5cb85c;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
`;
const ErrorMessage = styled.div`
  color: #d9534f;
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;
const PasswordWrapper = styled.div`
  position: relative;
`;
const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${props => (props.confirm ? "#e63946" : "#63cdda")};
  color: white;
  border: none;

  &:hover {
    background-color: ${props => (props.confirm ? "#f76c6c" : "#3b9bb5")};
  }
`;

const FieldError = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("useremail");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5224/api/Frontline/GetUsers/GetUserList"
        );
        const userData = response.data.find((user) => user.email === userEmail);
        if (userData) {
          setUser(userData);
          setFormData(userData);
        } else {
          setError("User not found!");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user details.");
      }
    };

    if (userEmail) {
      fetchUserDetails();
    } else {
      setError("No user logged in.");
      navigate("/login");
    }
  }, [userEmail, navigate]);

  


    const validateForm = () => {
    const errors = {};

    if (!formData?.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!/^\d{10}$/.test(formData?.phone)) {
      errors.phone = "Phone number must be a valid 10-digit number.";
    }

    if (!formData?.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };



    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const profilePicture = reader.result;
        setFormData((prevData) => ({ ...prevData, profilePicture }));
      };
      reader.readAsDataURL(file);
    }
    };



  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5224/api/Frontline/DeleteUser/${user.id}`
      );
      if (response.status === 200) {
        localStorage.removeItem("useremail");
        navigate("/home");
      } else {
        setError("Failed to delete profile.");
      }
    } catch (err) {
      console.error("Error deleting profile:", err);
      setError("Error deleting profile. Please try again.");
    }
  };
    const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle modal open and close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



      const handleRemoveImage = async () => {
      try {
        const updatedData = { ...formData, profilePicture: null };
        const response = await axios.put(
          `http://localhost:5224/api/Frontline/UpdateUser/${user.id}`,
          updatedData
        );
        if (response.status === 200) {
          setFormData(updatedData);
          localStorage.removeItem("profilePicture");
          setSuccess("Profile picture removed successfully.");
        } else {
          setError("Failed to remove profile picture.");
        }
      } catch (err) {
        console.error("Error removing profile picture:", err);
        setError("Error removing profile picture. Please try again.");
      }
    };




  const togglePasswordVisibility = () => {
        setPasswordVisible(true);
        setTimeout(() => {
          setPasswordVisible(false);
        }, 1000);
      };
  const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
          const response = await axios.put(
            `http://localhost:5224/api/Frontline/UpdateUser/${user.id}`,
            formData
          );
          if (response.status === 200) {
            setSuccess("Profile updated successfully.");
            setUser(formData);
            setIsEditing(false);
          } else {
            setError("Failed to update profile.");
          }
        } catch (err) {
          console.error("Error updating profile:", err);
          setError("Error updating profile. Please try again.");
        }
      };
  return (
    <ProfileContainer>
      <Heading>My Profile</Heading>
      <ProfileImageWrapper>
        <ProfileImage onClick={handleImageClick}>
          {formData?.profilePicture ? (
            <img src={formData.profilePicture} alt="Profile" />
          ) : (
            <FaUserCircle />
          )}
        </ProfileImage>
        <PenIcon onClick={handleImageClick}>✏️</PenIcon>
      </ProfileImageWrapper>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
          {formData?.profilePicture && (
            <div>
              <RemoveImageButton onClick={handleRemoveImage}>
                Remove Image
              </RemoveImageButton>
            </div>
          )
        }
      {isEditing ? (
        <form onSubmit={handleSave}>
          <Label>Name</Label>
           <Input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
          />
          {validationErrors.name && <FieldError>{validationErrors.name}</FieldError>}
          <Label>Email</Label>
          <Input type="email" name="email" value={formData?.email || ""} disabled />
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
          />
          {validationErrors.phone && <FieldError>{validationErrors.phone}</FieldError>}
          <Label>Password</Label>
          <PasswordWrapper>
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData?.password || ""}
              onChange={handleChange}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </PasswordWrapper>
          {validationErrors.password && (
            <FieldError>{validationErrors.password}</FieldError>
          )}
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <div>
          <Label>Name</Label>
          <InfoText>{user.name}</InfoText>
          <Label>Email</Label>
          <InfoText>{user.email}</InfoText>
          <Label>Phone Number</Label>
          <InfoText>{user.phone || "Not Provided"}</InfoText>
        </div>
      )}

      {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      {isEditing && <DeleteButton onClick={openModal}>Delete Profile</DeleteButton>} 

      {success && <SuccessMessage>{success}</SuccessMessage>}

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h3>Are you sure you want to delete your profile?</h3>
            <ModalButton onClick={handleDelete} confirm>
              Yes, Delete
            </ModalButton>
            <ModalButton onClick={closeModal}>Cancel</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default MyProfile;


  


