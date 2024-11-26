import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DRAWER_WIDTH = 240;

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <SideMenu width={DRAWER_WIDTH} />
            <Box
                component="main"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 64, // altura del Navbar
                    bottom: 0,
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout; 