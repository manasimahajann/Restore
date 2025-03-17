import { DarkMode, LightMode } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"

type Props = {
    themeMode: boolean,
    themeChange: () => void;
}

function Navbar({themeMode, themeChange}: Props) { 

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
      
        <Typography variant="h6" >
          RE-STORE
        </Typography> 
        <IconButton onClick={themeChange}>
            {themeMode? <DarkMode sx={{color:"grey"}}/> : <LightMode sx={{color:"yellow"}}/>}
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  )
}
export default Navbar