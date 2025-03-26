import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store"
import { setDarkMode } from "./uiSlice"

const midLinks = [
  {title: 'about', path: '/about'},
  {title: 'catalog', path: '/catalog'},
  {title: 'contact', path: '/contact'},
]


const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'}
]

const navStyles = {
  color: 'inherit', 
  typography: 'h6',
  textDecoration: 'none', 
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: '#baecf9'
  }  }
 

function Navbar() {  

  const {isLoading, darkMode} = useAppSelector(state => state.ui);
     const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
          <Typography component={NavLink} to='/' variant="h6" sx={{textDecoration: 'none', color: 'inherit'}}>
            RE-STORE
          </Typography> 
          <IconButton onClick={() => dispatch(setDarkMode())}>
              {darkMode? <DarkMode sx={{color:"grey"}}/> : <LightMode sx={{color:"yellow"}}/>}
          </IconButton>
        </Box>

        <List sx={{display: 'flex'}}>
        {midLinks.map(({title, path}) => (
          <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navStyles}
          >
            {title.toUpperCase()}

          </ListItem>
        ))}
        </List> 
   
      <Box display='flex' alignItems='center'>
        <IconButton size="large" sx={{color: 'inherit'}}> 
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart></ShoppingCart>

          </Badge>
        </IconButton>
        <List sx={{display: 'flex', justifyContent:'flex-end'}}>
        {rightLinks.map(({title, path}) => (
          <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navStyles}
          >
            {title.toUpperCase()}

          </ListItem>
        ))}
        </List>
        </Box>
      </Toolbar>

    </AppBar>
  </Box>
  )
}
export default Navbar

