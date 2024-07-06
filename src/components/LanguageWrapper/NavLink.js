// CustomNavLink.js
import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';

const CustomNavLink = ({ to, children, ...props }) => {


    return (
        <RouterNavLink to={to} {...props}>
            {children}
        </RouterNavLink>
    );
};

export default CustomNavLink;