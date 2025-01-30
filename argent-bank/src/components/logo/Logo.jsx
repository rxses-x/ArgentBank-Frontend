import { NavLink } from "react-router-dom";
import LogoImage from "../../assets/argentBankLogo.png";

export const Logo = () => {
    return (
        <NavLink to="/" className="main-nav__logo">
            <img
                src= { LogoImage }
                className="main-nav__logo-image"
                alt="Argent Bank Logo"
            />
            <h1
                className="sr-only">
                Argent Bank
            </h1>
        </NavLink>
    )
}