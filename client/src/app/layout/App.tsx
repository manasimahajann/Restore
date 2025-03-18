import {useState } from 'react'    
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function App() {

  const [themeMode, setThemeMode] = useState(true)
  const themeChange = () => { 
      setThemeMode(!themeMode)
  }
  const palleteType = themeMode ? 'dark' : 'light'


 
  const theme = createTheme({
    palette:{
      mode: palleteType,
      background: {
        default: (palleteType === 'dark') ? '#121212' : '#eaeaea'
      }
    }
})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Navbar themeMode={themeMode} themeChange={themeChange}/>  
      <Box
      sx={{mingHeight:'100vh',
        background: themeMode ?  
        'radial-gradient(circle, #1e31Ba, #111B27)' 
        :   'radial-gradient(circle, #baecf9, #f0f9ff)' ,py:6
      }}>
        <Container maxWidth='xl' sx={{mt:8}}> 
          <Outlet/> 
        </Container>
     </Box>
     </ThemeProvider>
  )
}

export default App
