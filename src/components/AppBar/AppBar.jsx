import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItem, ListItemIcon, ListItemText, Box,
  Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ModuleIcon from '@mui/icons-material/WidgetsRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAppBar } from "@/contexts/AppBarContext";

export default function MyAppBar() {
    const { title } = useAppBar();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const usuario = 'Christian Frey';

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModules = () => {
        handleMenuClose();
        navigate("/Modulo");
    };

    const handleLogout = () => {
        handleMenuClose();
        navigate("/Login");
    };

    return (
    <>
        <AppBar sx={{ backgroundColor: "#202039", borderEndStartRadius: "10px", borderEndEndRadius: "10px", mb: 2 }} position="fixed">
            <Toolbar>
                <IconButton
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                        color: '#b9b9df',
                        backgroundColor: 'transparent',
                        },
                        transition: 'none'
                    }} 
                    edge="start" 
                    color="inherit" 
                    onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                <IconButton
                    color="inherit"
                    onClick={handleUserClick}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                        color: '#b9b9df',
                        backgroundColor: 'transparent',
                        },
                        transition: 'none'
                    }}
                    >
                    {/* <AccountCircle /> */}
                    <Typography
                        variant="body2"
                        sx={{
                            ml: 1,
                            transition: 'none',
                            '&:hover': {
                                color: '#b9b9df'
                            }
                        }}
                    >
                        {usuario.toUpperCase()}
                    </Typography>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}                    
                >
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                    <ListItem button>
                        <ListItemIcon><ModuleIcon /></ListItemIcon>
                        <ListItemText primary="Módulos" sx={{cursor: "pointer"}} onClick={handleModules} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
  );
}