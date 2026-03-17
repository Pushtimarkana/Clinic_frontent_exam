import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  TextField,
  IconButton
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Dropdown handlers
 
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f3d6e" }}>
      
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/dashboard")}
        >
          🏥 ClinicMS
        </Typography>

        {/* Menu */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          
          

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Cardiology</MenuItem>
            <MenuItem onClick={handleClose}>Neurology</MenuItem>
            <MenuItem onClick={handleClose}>Orthopedics</MenuItem>
            <MenuItem onClick={handleClose}>Pediatrics</MenuItem>
          </Menu>

          {role === "admin" && (
            <>
              <Button color="inherit" onClick={() => navigate("/users")}>Users</Button>
              <Button color="inherit" onClick={() => navigate("/doctors")}>Doctors</Button>
            </>
          )}

          {role === "doctor" && (
            <>
              <Button color="inherit" onClick={() => navigate("/todays-queue")}>Today's Queue</Button>
              <Button color="inherit" onClick={() => navigate("/add-prescription")}>Add Prescription</Button>
              <Button color="inherit" onClick={() => navigate("/add-report")}>Add Report</Button>
            </>
          )}

          {role === "receptionist" && (
            <>
              <Button color="inherit" onClick={() => navigate("/daily-queue")}>Daily Queue</Button>
              <Button color="inherit" onClick={() => navigate("/appointments")}>Appointments</Button>
              <Button color="inherit" onClick={() => navigate("/patients")}>Patients</Button>
            </>
          )}

          {role === "patient" && (
            <>
              <Button color="inherit" onClick={() => navigate("/patient-dashboard")}>Patient Dashboard</Button>
              <Button color="inherit" onClick={() => navigate("/book-appointment")}>Book Appointment</Button>
              <Button color="inherit" onClick={() => navigate("/my-appointments")}>My Appointments</Button>
              <Button color="inherit" onClick={() => navigate("/my-prescription")}>My Prescription</Button>
              <Button color="inherit" onClick={() => navigate("/my-report")}>My Report</Button>
            </>
          )}
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          
          {/* User */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircle />
            <Typography variant="body2">
              {user?.name || "User"}
            </Typography>
          </Box>

          {/* Logout */}
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;