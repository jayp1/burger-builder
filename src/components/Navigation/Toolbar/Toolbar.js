import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSidebar from '../Sidedrawer/ToggleSidebar/ToggleSidebar';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleSidebar clicked={props.clicked}/>

        <div className={classes.Logo}>
            <Logo />
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn={props.isLoggedIn}/>
        </nav>
        
    </header>
);
export default toolbar;