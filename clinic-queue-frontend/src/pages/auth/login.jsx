import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{
    Box,
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import {login} from "../../services/authService"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     console.log('email:', email);
    //     console.log('password:', password);
    //     try{
    //         const res=await login({email,password});
    //         // localStorage.setItem("token", res.data.token);
    //         alert("Login successful!");
    //         navigate("/dashboard");
    //     }catch(err){
    //         console.error("Login failed:", err);
    //         alert("Login failed. Please check your credentials and try again.");
    //         return;
    //     }
        
    // };

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        await login({ email, password });

        alert("Login successful!");
        navigate("/dashboard");

    } catch (err) {
        console.error("Login failed:", err);
        alert("Invalid credentials");
    }
};
    return (
       <Box sx={{ minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #e8edf3, #f1f2f4)"
        }}>

            <Card sx={{width: 380, borderRadius: 3, boxShadow: 6}}>
                <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <LockOutlined sx={{ fontSize: 40, color: "#1976d2" }} />
                    <Typography variant="h5" fontWeight="bold">
                    Sign In
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Welcome back, please login
                    </Typography>
                </Box>
                <form onSubmit={handleLogin}>
                    <TextField fullWidth 
                        type='text'
                        name='email'
                        label="Email" 
                        variant="outlined" 
                        margin="normal" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
                        >
                        Login
                    </Button>
                </form>
                </CardContent>

            </Card>
        </Box>
    )
}

export default Login;