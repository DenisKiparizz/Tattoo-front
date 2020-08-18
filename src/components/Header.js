import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../services/auth.service";
import logo from "../images/logo2png.png"

import "../css/Header.css"
import NavbarBrand from "react-bootstrap/NavbarBrand";

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
            <>
                <Navbar bg="light" expand="lg">
                    <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav"/>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {currentUser && (<Nav.Link href="/catalog">Catalog</Nav.Link>)}
                            {showModeratorBoard && (<Nav.Link href="/mod">Moderator Board</Nav.Link>)}
                            {showAdminBoard && (<Nav.Link href="/admin">Admin Board</Nav.Link>)}
                        </Nav>
                        <Nav>
                            {currentUser
                                ? (
                                    <>
                                        <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                                        <Nav.Link href="/login" onClick={this.logOut}>LogOut</Nav.Link>
                                    </>
                                )
                                : (<>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        <Nav.Link href="/register">Sign Up</Nav.Link>
                                    </>
                                )}
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
            </>
        );
    }
}

export default Header;
