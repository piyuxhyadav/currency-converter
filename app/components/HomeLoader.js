"use client";

import { Box, Typography } from "@mui/material";
import {Fade,AttentionSeeker} from 'react-awesome-reveal';

const HomeLoader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
        textAlign:'center',
        background: "#FFFFE0",
      }}
    >
       <Fade>
        <AttentionSeeker effect="tada" fraction="0.2">
      <Typography variant="h2" color='#000'>Currency Converter</Typography>
      </AttentionSeeker>
      </Fade>
    </Box>
  );
};

export default HomeLoader;
