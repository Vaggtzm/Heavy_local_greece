// CustomNavLink.js
import React from 'react';
import {NavLink as RouterNavLink, useLocation, useParams} from 'react-router-dom';

const CustomNavLink = ({ to, children, ...props }) => {
    const location = useLocation();

    const params = useParams();

    // Extract lang from URL params
    const { lang } = params;
    const url = lang ? `/${lang}${to}` : to;

    return (
        <RouterNavLink to={url} {...props}>
            {children}
        </RouterNavLink>
    );
};

export default CustomNavLink;