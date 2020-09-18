import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthService from "../services/auth.service";
import logo from "../images/Logo.png"
import NavbarBrand from "react-bootstrap/NavbarBrand";
import "../css/Header.css"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserBoard: false,
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
                showUserBoard: user.roles.includes("ROLE_USER"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut = () => {
        AuthService.logout();
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav"/>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {(currentUser && !showAdminBoard) && (<Nav.Link href="/catalog">Catalog</Nav.Link>)}
                            {(currentUser && !showAdminBoard) && (<Nav.Link href="/orders">My Orders</Nav.Link>)}
                            {(currentUser && !showAdminBoard) && (<Nav.Link href="/review">See Review</Nav.Link>)}
                            {showAdminBoard && (<Nav.Link href="/adminTattoo">Tattoo</Nav.Link>)}
                            {showAdminBoard && (<Nav.Link href="/adminOrders">Orders</Nav.Link>)}
                            {showAdminBoard && (<Nav.Link href="/adminUsers">Users</Nav.Link>)}
                            {showAdminBoard && (<Nav.Link href="/adminReview">Reviews</Nav.Link>)}
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
