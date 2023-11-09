import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Signout from "./components/Signout/Signout";
import SportsIcon from '@mui/icons-material/Sports';
import { Avatar } from "@mui/material";

// source: https://www.w3schools.com/react/react_router.asp
// source: https://mui.com/components/app-bar/#app-bar-with-responsive-menu

const sportStyle = {backgroundColor: 'black', mr: 10};
const pages = [
  <Link to="/login">Login</Link>,
  <Link to="/signup">Signup</Link>,
  <Link to="/gettags">Get Tags</Link>,
  <Link to="/">Home</Link>,
];

const Layout = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ '&:hover': {
                  backgroundColor: 'white'},
                  my: 2, color: 'red', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Avatar style={sportStyle}><SportsIcon/></Avatar>
          <Typography
             variant="h4"
             noWrap
             component="div"
             sx={{mr: 60 , display: { xs: 'none', md: 'flex' } }}
          >
           WhistleBlower
          </Typography>
          <Signout></Signout>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default Layout;