import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DRAWER_WIDTH = 240;

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar onMenuClick={handleDrawerToggle} />
            <SideMenu 
                width={DRAWER_WIDTH}
                mobileOpen={mobileOpen}
                onMobileClose={handleDrawerToggle}
            />
            <Box
                component="main"
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 64,
                    bottom: 0,
                    width: {
                        xs: '100%',
                        sm: `calc(100% - ${DRAWER_WIDTH}px)`
                    },
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