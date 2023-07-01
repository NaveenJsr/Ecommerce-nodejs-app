import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";


const Menu = () =>
{
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = ( currentPath, path ) =>
    {
        return currentPath === path ? { color: "#ff9900" } : { color: "#ffffff" };
    };

    const handleNavigation = ( path ) =>
    {
        navigate( path );
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className={ `nav-item ${ location.pathname === "/" ? "active" : "" }` }>
                    <Link
                        to="/"
                        className="nav-link"
                        style={ isActive( location.pathname, "/" ) }
                        onClick={ () => handleNavigation( "/" ) }
                    >
                        Home
                    </Link>
                </li>


                <li className={ `nav-item ${ location.pathname === "/shop" ? "active" : "" }` }>
                    <Link
                        to="/shop"
                        className="nav-link"
                        style={ isActive( location.pathname, "/shop" ) }
                        onClick={ () => handleNavigation( "/shop" ) }
                    >
                        Shop
                    </Link>
                </li>

                <li className={ `nav-item ${ location.pathname === "/cart" ? "active" : "" }` }>
                    <Link
                        to="/cart"
                        className="nav-link"
                        style={ isActive( location.pathname, "/cart" ) }
                        onClick={ () => handleNavigation( "/cart" ) }
                    >
                        Cart <sup><small className="badge badge-pill badge-success cart-badge"> { itemTotal() } </small></sup>
                    </Link>
                </li>


                { !isAuthenticated() && (
                    <Fragment>
                        <li
                            className={ `nav-item ${ location.pathname === "/signin" ? "active" : ""
                                }` }
                        >
                            <Link
                                to="/signin"
                                className="nav-link"
                                style={ isActive( location.pathname, "/signin" ) }
                                onClick={ () => handleNavigation( "/signin" ) }
                            >
                                Signin
                            </Link>
                        </li>
                        <li
                            className={ `nav-item ${ location.pathname === "/signup" ? "active" : ""
                                }` }
                        >
                            <Link
                                to="/signup"
                                className="nav-link"
                                style={ isActive( location.pathname, "/signup" ) }
                                onClick={ () => handleNavigation( "/signup" ) }
                            >
                                Signup
                            </Link>
                        </li>
                    </Fragment>
                ) }

                { isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li
                        className={ `nav-item ${ location.pathname === "/user/dashboard" ? "active" : ""
                            }` }
                    >
                        <Link
                            to="/user/dashboard"
                            className="nav-link"
                            style={ isActive( location.pathname, "/user/dashboard" ) }
                            onClick={ () => handleNavigation( "/user/dashboard" ) }
                        >
                            Dashboard
                        </Link>
                    </li>
                ) }

                { isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li
                        className={ `nav-item ${ location.pathname === "/admin/dashboard" ? "active" : ""
                            }` }
                    >
                        <Link
                            to="/admin/dashboard"
                            className="nav-link"
                            style={ isActive( location.pathname, "/admin/dashboard" ) }
                            onClick={ () => handleNavigation( "/admin/dashboard" ) }
                        >
                            Dashboard
                        </Link>
                    </li>
                ) }

                { isAuthenticated() && (

                    <li
                        className={ `nav-item ${ location.pathname === "/signout" ? "active" : ""
                            }` }
                    >
                        <span
                            className="nav-link"
                            style={ { cursor: 'pointer', color: '#ffffff' } }
                            onClick={ () => signout( () =>
                            {
                                navigate( '/' );
                            } ) }
                        >
                            Signout
                        </span>
                    </li>

                ) }

            </ul>
        </div>
    );
};

export default Menu;
