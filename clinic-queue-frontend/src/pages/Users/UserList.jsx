import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";

import {createUser, getAllUsers } from "../../services/userService";
import { Password } from "@mui/icons-material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
//   navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    Password:""
    });

  

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.email || !formData.role || !formData.password) {
            alert("Please fill all required fields");
            return;
            }
            console.log("Sending data:", formData); // debug
            await createUser(formData);
            alert("User added successfully");
            handleClose();
            const data = await getAllUsers();
            setUsers(data);
            // reset form
            setFormData({
            name: "",
            email: "",
            phone: "",
            role: "",
            password: ""
            });

        } catch (err) {
            console.error("ERROR:", err.response?.data || err);
            alert(err.response?.data?.message || "Error adding user");
        }
        };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Role color
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "error";
      case "doctor":
        return "success";
      case "receptionist":
        return "warning";
      case "patient":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        User List
      </Typography>

    <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpen}
        >
        + Add User
    </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        
        <TableContainer component={Paper} elevation={3}>
          <Table>
            
            {/* Table Header */}
            <TableHead sx={{ backgroundColor: "#0f3d6e" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Role</TableCell>
                <TableCell sx={{ color: "white" }}>Created At</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  
                  {/* Role Chip */}
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      variant="outlined"
                    />
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add New User</DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    margin="normal"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    margin="normal"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    select
                    label="Role"
                    name="role"
                    margin="normal"
                    value={formData.role}
                    onChange={handleChange}
                >
                
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="receptionist">Receptionist</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
                </TextField>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                Add
                </Button>
            </DialogActions>
            </Dialog>
        </TableContainer>
        
      )}
    </Box>
  );
};

export default UserList;