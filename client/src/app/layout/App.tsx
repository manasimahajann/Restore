import { useEffect, useState } from 'react'  
import axios from 'axios';
import { product } from '../models/product';
import Catalog from '../features/catalog/Catalog'; 
import { Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Navbar from './Navbar';

function App() {

  const [products, setProducts] = useState<product[]>([]) 

  
  const [themeMode, setThemeMode] = useState(true)
  const themeChange = () => { 
      setThemeMode(!themeMode)
  }
  const palleteType = themeMode ? 'dark' : 'light'

  useEffect(()=>{
    fetch("https://localhost:5001/api/products/")
    .then(response => response.json())
    .then(data => setProducts(data))  
  }, [])

 
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
          <Catalog products={products}/> 
        </Container>
     </Box>
     </ThemeProvider>
  )
}

export default App
