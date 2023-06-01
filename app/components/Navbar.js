"use client"

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
      <Box position="relative" sx={{ background: "#343434",zIndex:'1100' }}>
        <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Typography variant="h6" component="div" sx={{color:'#FFFFF0', fontFamily:'Montserrat', fontSize:'25px'}}>
            Currency Converter
          </Typography>
        </Toolbar>
      </Box>
  );
}
