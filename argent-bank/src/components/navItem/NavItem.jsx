import { NavLink } from "react-router-dom";

export const NavItem = ({ href, iconClass, children }) => (
    <NavLink to={href}>
        <i
            className={iconClass}
        >
        </i>
        {children}
    </NavLink>
);

export const NavItemUser = ({ iconClass, onClick, title }) => (
    <i
        className={ iconClass }
        onClick={ onClick }
        title= { title }
    >
    </i>
);