import React, {Component} from "react";
import AuthService from "../services/auth.service";
import OrderService from "../services/order-service";
import Header from "../components/Header";
import TattooInOrder from "../components/TattooInOrder";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../css/Tables.css"
import Footer from "../components/Footer";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            allOrders: [],
            totalPrice: ''
        };
    }

    getTotalPrice = (userId) => {
        OrderService.getTotalPrice(userId)
            .then(resp => {
                this.setState({
                    totalPrice: resp.data
                })
            })
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState(
            {
                currentUser: currentUser,
                userReady: true,
            })
        OrderService.getOrdersByUserId(currentUser.id)
            .then(resp => {
                let all = (resp.data);
                this.setState({
                    allOrders: all,
                })
            })
        this.getTotalPrice(currentUser.id)
    }

    delete(id) {
        OrderService.deleteOrder(id)
            .then(() => {
                let updatedGroups = [...this.state.allOrders].filter(i => i.id !== id);
                this.setState({
                    allOrders: updatedGroups,
                })
            }).then(() => {
            this.getTotalPrice(this.state.currentUser.id)
        })
    }

    getUserOrders = () => this.state.allOrders.map(item => {
        return (
            <tr>
                <TattooInOrder
                    key={item.id}
                    order={item}
                    tattoo={item.tattooId}
                    totalPrice={this.state.totalPrice}
                />
                <td>
                    <Button size="sm" variant="danger" onClick={() => this.delete(item.id)}>Delete</Button>
                </td>
            </tr>
        )
    })

    render() {
        const {currentUser} = this.state;
        return (
            <>
                <Header/>
                <div>
                    <h3 className="profile-title">{currentUser.email} </h3>
                </div>
                <h1 className="style-title">Your Orders</h1>

                <div className="profile-table">
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Part Of Body</th>
                            <th>Picture</th>
                            <th>Style</th>
                            <th>Price</th>
                            <th>Created date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getUserOrders()}
                        </tbody>
                        <thead>
                        <h5 className="total-price">{this.state.totalPrice}</h5>
                        </thead>
                    </Table>
                </div>
                <Footer/>
            </>
        );
    }
}
