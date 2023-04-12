import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Better Proxies
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
