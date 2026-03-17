import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet ,Navigate} from "react-router-dom";
// import { useState } from "react";

function AppLayout() {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden"  }}>
  
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" ,transition: "0.3s"}}>
        <Navbar />

        <Box sx={{flexGrow: 1, p: 3 ,overflowY: "auto",transition: "0.3s"}}>
          <Outlet/>
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
