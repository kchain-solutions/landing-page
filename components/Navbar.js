import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

import logo from "../images/logo.png"

import lang from "../lang/navbar.json"
import { GlobalContext } from "../components/GlobalContext"


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
let anchors = [];

export default function Navbar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [localState, setLocalState] = useState();

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const loadAnchorsOnNavabar = () => {
        return anchors.map((elem) => (
            <a href={elem.link}>
                <Button
                    key={elem.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {elem.name}
                </Button>
            </a>
        ))
    }

    const loadAnchorsOnMenu = () => {
        return anchors.map((elem) => (
            <MenuItem key={elem.name} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{elem.name}</Typography>
            </MenuItem>
        ))
    }

    useEffect(() => {
        setLocalState({
            title: lang[globalState.language]['title'],
        })

 

        if (globalState.currentPage == 'index.js') {
            anchors.splice(0);
            anchors.push({
                name: lang[globalState.language]['contact-us'],
                link: props.baseUrl + '/contact'
            },
                {
                    name: 'Demo',
                    link: props.baseUrl + '/ethereum'
                })
            anchors.push({ name: lang[globalState.language]['services'], link: '' });
            anchors.push({ name: lang[globalState.language]['mission'], link: '' });
        }


        console.log('base url', props.baseUrl);
        loadAnchorsOnNavabar();
        loadAnchorsOnMenu();

    }, []);




    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 164 }}>

                    <Box
                        component="img"
                        sx={{
                            display: 'flex', flexWrap: 'wrap',
                            alignItems: 'center',
                            height: 128,
                            width: 128,
                            mr: "2rem"
                        }}
                        src={logo.src}
                    />
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {localState?.title.toUpperCase()}
                    </Typography>

                    <Divider orientation="vertical" flexItem sx={{
                        color: "#FFFFFF"
                    }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {loadAnchorsOnMenu()}
                        </Menu>
                    </Box>


                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {localState?.title.toUpperCase()}
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: "row-reverse" }}>
                        {loadAnchorsOnNavabar()}
                    </Box>

                    {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

