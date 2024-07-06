// CustomNavLink.js
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomNavLink = ({ to, children, ...props }) => {
    const { i18n } = useTranslation();
    const language = i18n.language;
    const newPath = `/${language}${to}`;

    return (
        <RouterNavLink to={newPath} {...props}>
            {children}
        </RouterNavLink>
    );
};

export default CustomNavLink;