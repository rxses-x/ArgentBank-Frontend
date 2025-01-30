import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { Logo } from "../../components/logo/Logo";
import { NavItem, NavItemUser } from "../../components/navItem/NavItem";

export const Nav = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(logout()); // Dispatch the logout action
        navigate("/"); // Redirect to the sign-in page
        // clear token
    };

    const handleSetting = () => {
        console.log('clicked on setting button');
    }

    return (
        <nav className="main-nav">
            <Logo />
            {userInfo && userInfo.userName ? (
                <div className="main-nav__user">
                    <>
                        <NavItemUser
                            iconClass="fa fa-solid fa-power-off"
                            onClick={ handleLogout }
                            title="Logout"
                        >
                        </NavItemUser>
                        <NavItemUser
                            iconClass="fa fa-solid fa-gear"
                            onClick={ handleSetting }
                            title="Setting"
                        >
                        </NavItemUser>
                        <NavItem
                            href="./profile"
                            iconClass="fa fa-user-circle"
                        >
                            <span>{ userInfo?.userName }&nbsp;</span>
                        </NavItem>
                    </>
                </div>
            ) : (
                <div className="main-nav__item">
                    <NavItem
                        href="./login"
                        iconClass="fa fa-user-circle"
                    >
                        &nbsp;Sign In
                    </NavItem>
                </div>
            )}
        </nav>
    );
}