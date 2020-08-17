import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                allTattoo: localStorage.getItem("allTattoo"),
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut = () => {
        AuthService.logout();
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <NavbarToggle aria-controls="basic-navbar-nav"/>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            <Nav.Link href="/">Tattoo</Nav.Link>
                            <Nav.Link href="/home">Home</Nav.Link>

                            {showModeratorBoard
                            &&
                            (<Nav.Link href="/mod">Moderator Board</Nav.Link>)}

                            {showAdminBoard
                            &&
                            (<Nav.Link href="/admin">Admin Board</Nav.Link>)}

                            {currentUser
                                ?
                                (<div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            LogOut
                                        </a>
                                    </li>
                                </div>) : (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link">
                                                Login
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to={"/register"} className="nav-link">
                                                Sign Up
                                            </Link>
                                        </li>
                                    </div>
                                )}
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
