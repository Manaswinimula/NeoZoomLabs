// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { useAuth } from '../Context/AuthContext';
// import axios from 'axios';

// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f4f4f4;
// `;

// const StyledButton = styled.button`
//   background-color: #dc3545;
//   color: white;
//   font-size: 16px;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #c82333;
//   }
// `;

// function Logout() {
//   const { state, logout } = useAuth();  // Access state and logout from context
//   const navigate = useNavigate();

//   // Check if the user is authenticated
//   useEffect(() => {
//     if (!state.isAuthenticated) {
//       navigate('/login');  // Redirect to login if not authenticated
//     }
//   }, [state.isAuthenticated, navigate]);

//   const handleLogout = async () => {
//     try {
//       // Dispatch the logout action to clear the user session
//       logout();
//       // Optionally remove user info from the backend
//       await axios.delete('http://localhost:3000/current_user');  // Assuming you're using a backend to manage current_user
//       navigate('/login');  // Redirect to login page after logout
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div>
//         <>
//           {/* <h1>Welcome to your Dashboard, {state.user?.name}!</h1>
//           <StyledButton onClick={handleLogout}>Log Out</StyledButton> */}
//         </>
//     </div>
//   );
// }

// export default Logout;
