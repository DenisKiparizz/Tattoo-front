import React from 'react';
import Header from "../../components/Header";
import UserService from "../../services/users-service"
import AuthService from "../../services/auth.service";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {MDBTableBody, MDBTableHead} from "mdbreact";
import Footer from "../../components/Footer";
import SwipeableTextMobileStepper from "../../components/Test";
import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

export default class AdminUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            users: []
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        UserService.getAll()
            .then(resp => {
                let users = resp.data;
                this.setState({
                    users: users,
                    currentUser: currentUser.id
                })
            })
    }

    delete(id) {
        UserService.deleteById(id)
            .then(() => {
                let updatedGroups = [...this.state.users].filter(i => i.id !== id);
                this.setState({
                    users: updatedGroups
                })
            })
    }

    getAllUsers = () => this.state.users.filter(i => i.id !== this.state.currentUser).map(resp => {
        return (
            <tr>
                <td>{resp.id}</td>
                <td>{resp.username}</td>
                <td>{resp.email}</td>
                <td>{resp.roleDto.map(resp => resp.role)}</td>
                <td>
                    <Button size="sm" variant="danger" onClick={() => this.delete(resp.id)}>Delete</Button>
                </td>
            </tr>
        )
    })

    render() {
        return (
            <>
                <Header/>
                <h2>All Users</h2>
                <Table>
                    <MDBTableHead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.getAllUsers()}
                    </MDBTableBody>
                </Table>
                <SwipeableTextMobileStepper/>
                <Footer/>
            </>
        );
    }
}
