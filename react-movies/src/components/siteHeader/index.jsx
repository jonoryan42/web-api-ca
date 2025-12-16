import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../../contexts/authContext";
import LogoutIcon from "@mui/icons-material/Logout";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  //For when user is authenticated
  const { isAuthenticated, signout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  //User Specific Options
  const mainOptions = [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Must Watch", path: "/movies/must-watch" },

  ];

//Dropdown for Movie Categories
  const menuOptions = [
    { label: "Discover", path: "/home" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top-Rated", path: "/movies/top-rated" },
  ];

  const [moviesAnchorEl, setMoviesAnchorEl] = useState(null);
  const moviesOpen = Boolean(moviesAnchorEl);

  const handleMoviesMenuOpen = (event) => setMoviesAnchorEl(event.currentTarget);

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMoviesMenuSelect = (pageURL) => {
    setMoviesAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //For Logout
  const handleLogout = () => {
  setAnchorEl(null);
  setMoviesAnchorEl(null);
  signout();
  navigate("/login"); // or "/" if you prefer
};


  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {isAuthenticated && menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
              {isAuthenticated && (
                 <Button
                   color="inherit"
                   onClick={handleMoviesMenuOpen}
                   aria-controls={moviesOpen ? "movies-menu" : undefined}
                   aria-haspopup="true"
                   aria-expanded={moviesOpen ? "true" : undefined}
                   endIcon={<ArrowDropDownIcon
                    sx={{
                      ml: "-6px",
                    }}
                    />
                    }
                 >
                  Movies
                </Button>
                )}
                 <Menu
                   id="movies-menu"
                   anchorEl={moviesAnchorEl}
                   open={moviesOpen}
                   onClose={() =>setMoviesAnchorEl(null)}
                  >
                  {menuOptions.map((opt) => (
                     <MenuItem key={opt.label} 
                     onClick={() => handleMoviesMenuSelect(opt.path)}>
                      {opt.label}
                    </MenuItem>
                   ))}

                 </Menu>
                {isAuthenticated && mainOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                

                 {isAuthenticated && (
  <Button
    color="inherit"
    onClick={handleLogout}
    startIcon={<LogoutIcon />}
  >  </Button>
)}

              </>

              
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
