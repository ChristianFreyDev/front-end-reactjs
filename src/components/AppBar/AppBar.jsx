import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItem, ListItemIcon, ListItemText, Box
} from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuIcon from '@mui/icons-material/Menu';
import PasswordIcon from '@mui/icons-material/KeyRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ModuleIcon from '@mui/icons-material/WidgetsRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAppBar } from "@/contexts/AppBarContext";

export default function MyAppBar() {
    const { title } = useAppBar();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const user = 'Christian Frey';
    const version = '2025.04.15.1';

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

    const handlePassword = () => {
        handleMenuClose();
        //Aqui vai chamar a tela/modal para redefinir a senha //navigate("/Login");
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

                    {/* <AccountCircle/> */}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1,
                                transition: 'none',
                                '&:hover': {
                                    color: '#b9b9df'
                                }
                            }}
                        >
                            {user.toUpperCase()}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                lineHeight: 1,
                                color: '#cccccc',
                                mt: 0.5,
                            }}
                        >                            
                            {version}
                        </Typography>
                    </Box>
                </IconButton>             

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        sx: {
                            p: 0.1,
                            borderRadius: '10px',
                            boxShadow: 1,
                            backgroundColor: '#fff', 
                            minWidth: 180,
                            overflow: 'hidden'
                        },
                    }}
                >
                    <Box>
                        <Box
                            onClick={handlePassword}
                            sx={{         
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: '10px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#b9b9df',
                                    color: '#202039',
                                },
                            }}
                        >
                            <PasswordIcon fontSize="small" sx={{ mr: 1 }} />
                                Redefinir senha
                        </Box>
                        <Box
                            onClick={handleLogout}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: '10px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#b9b9df',
                                    color: '#202039',
                                },
                            }}
                        >
                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                                Logout
                        </Box>
                    </Box>
                </Popover>
            </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250, p: 0.1 }} role="presentation">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton 
                        onClick={toggleDrawer(false)}
                        sx={{
                            color: '#555566',
                            '&:hover': {
                                color: '#b9b9df'
                            }
                        }}
                    >
                        <CloseIcon  />
                    </IconButton>
                </Box>
                <List>
                    <ListItem button 
                        sx={{
                            '&:hover': {
                                backgroundColor: '#b9b9df',
                                borderRadius: '10px',
                            }
                        }}>
                        <ListItemIcon><ModuleIcon /></ListItemIcon>
                        <ListItemText primary="Módulos" sx={{ cursor: "pointer" }} onClick={handleModules} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
  );
}