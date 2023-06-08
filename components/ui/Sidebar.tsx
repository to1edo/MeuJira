import { useContext } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { UIContext } from '../../context/ui';
import Link from 'next/link';



export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu  } = useContext( UIContext );


    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose={ closeSideMenu }
        >
            <Box sx={{ width: 250 }}>

                <Box sx={{ padding:'5px 10px' }}>
                    <Typography variant="h4">Menu</Typography>
                </Box>

                <List>
                    <Link href="/">
                        <ListItem button>
                            <ListItemIcon>
                                <HomeOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Inicio'} sx={{textDecoration: 'none', color: 'white'}} />
                        </ListItem>
                    </Link>
                </List>

            </Box>
            
        </Drawer>
    )
};
