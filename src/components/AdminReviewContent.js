import React from 'react';
import Table from "react-bootstrap/Table";
import {MDBTableBody, MDBTableHead} from "mdbreact";
import OrderService from "../services/order-service";
import UserService from "../services/users-service";
import TattooService from "../services/tattoo-service";
import ReactStars from "react-rating-stars-component";
import ReviewService from "../services/review-service";

export default class AdminReviewContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            user: [],
            tattoo: []
        }
    }


    componentDidMount = () => {
        OrderService.getOrderById(this.props.item.orderId)
            .then(order => {
                UserService.getUserById(order.data.userId)
                    .then(user => {
                        TattooService.getTattooById(order.data.tattooId)
                            .then(tattoo => {
                                this.setState({
                                    order: order.data,
                                    user: user.data,
                                    tattoo: tattoo.data
                                })
                            })
                    })
            })
    }

    // delete(id) {
    //     ReviewService.deleteReview(id)
    //         .then(() => {
    //             let updatedGroups = [...this.state.reviews].filter(i => i.id !== id);
    //             this.setState({
    //                 reviews: updatedGroups
    //             })
    //         })
    // }

    getAll = () => {
        return (
            <tr>
                <td>{this.props.item.id}</td>
                <td>{this.state.user.email}</td>
                <td>{this.state.order.part}</td>
                <td>{this.state.tattoo.picture}</td>
                <td>{this.props.item.comment}</td>
                <td>
                    <ReactStars
                        classNames="noHover"
                        count={10}
                        value={this.props.item.mark}
                        size={16}
                    /></td>
            </tr>
        )
    }


    render() {
        return (
            <>
                {this.getAll()}
            </>
        );
    }
}