import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../components/login-signup/Login";
import Dashboard from "../Pages/Dashboard";
import ProtectedRouter from "./ProtectedRouter";
import { AuthProvider } from "../Context/AuthContext";
function AppRouter() {
   const [userEmail, setUserEmail] = useState(null);

  useEffect(()=>{
    const storedUserEmail = localStorage.getItem("useremail");
    setUserEmail(storedUserEmail)
  })

  return (
    <Router>
      <AuthProvider>
      <MainLayouts>
        <Routes>
          <Route path="/login" element={<Login />} />
         
          <Route path="/dashboard" element={
            <ProtectedRouter>
              <Dashboard />
            </ProtectedRouter>
          } />
        </Routes>
      </MainLayouts>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
