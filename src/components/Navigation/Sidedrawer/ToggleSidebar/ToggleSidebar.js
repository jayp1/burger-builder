import React from 'react';

import classes from './ToggleSidebar.module.css';

const toggleSidebar = props => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
    

export default toggleSidebar;