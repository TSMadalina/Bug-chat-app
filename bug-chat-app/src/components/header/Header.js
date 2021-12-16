import React from 'react';
import './Header.css';
import {Avatar} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useStateValue} from '../../StateProvider';

//organize the header in 3 parts
function Header() {
    const [{user}] = useStateValue();

    return (
        <div className="header">

            <div className="header_left">
                 {/* Avatar for the current user */}
                <Avatar className = "header_avatar" 
                alt={user?.displayName}
                src={user?.photoURL}
                />

                {/* Time icon */}
                <AccessTimeIcon />
                
            </div>

            <div className="header_search">
                {/* Search icon */}
                <SearchIcon />
                {/* Input */}
                <input placeholder="Search"/>
            </div>

            <div className="header_right">
                {/* Help icon */}
                <HelpOutlineIcon/>
            </div>

        </div>
    )
}

export default Header
