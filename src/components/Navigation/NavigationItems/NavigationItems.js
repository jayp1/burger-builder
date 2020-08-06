import React from 'react';


import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isLoggedIn ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isLoggedIn ? 
            <NavigationItem link="/logout">Logout</NavigationItem>
            :<NavigationItem link="/login">Login</NavigationItem>}
    </ul>
);
export default navigationItems;