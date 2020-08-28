import React from 'react';
import Header from "../../components/Header";
import OrderService from "../../services/order-service"
import {MDBTableBody, MDBTableHead} from "mdbreact";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AdminOrderTable from "../../components/AdminOrderTable";
import Footer from "../../components/Footer";

export default class AdminOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        OrderService.getAllOrders()
            .then(resp => {
                let all = (resp.data);
                this.setState({
                    orders: all,
                    userId: resp.data.userId
                })
            })
    }

    delete(id) {
        OrderService.deleteOrder(id)
            .then(() => {
                let updatedGroups = [...this.state.orders].filter(i => i.id !== id);
                this.setState({
                    orders: updatedGroups
                })
            })
    }

    getResult = () => this.state.orders.map(item => {
        let date = new Date(item.created)
        return (
            <tr>
                <AdminOrderTable key={item.id}
                                 date={date}
                                 data={item}/>
                <td>
                    <Button size="sm" variant="danger" onClick={() => this.delete(item.id)}>Delete</Button>
                </td>
            </tr>
        )
    })

    render() {
        return (
            <>
                <Header/>
                <h1>All Orders</h1>
                <Table>
                    <MDBTableHead>
                        <tr>
                            <th>Id</th>
                            <th>Part Of Body</th>
                            <th>Price</th>
                            <th>User ID</th>
                            <th>Email</th>
                            <th>Tattoo ID</th>
                            <th>Picture</th>
                            <th>Style</th>
                            <th>Created date</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.getResult()}
                    </MDBTableBody>
                </Table>
                <Footer/>
            </>
        );
    }
}
