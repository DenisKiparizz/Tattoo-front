import React from 'react';
import OrderService from "../../src/services/order-service"
import TattooService from "../../src/services/tattoo-service"
import UserService from "../../src/services/users-service"
import "../css/ReviewStyle.css"
import Card from "react-bootstrap/Card";
import ReactStars from "react-rating-stars-component";

export default class ReviewEnvironment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            review: [],
            order: [],
            user: [],
            tattoo: []
        }
    }

    componentDidMount = () => {
        OrderService.getOrderById(this.props.reviewOrderId)
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

    getReviews = () => {
        return (
            <div className="review-block">
                    <Card.Title className="review-username">
                        {this.state.user.username}
                        <h3>{this.state.user.email}</h3>
                    </Card.Title>
                <ReactStars
                    classNames="noHover"
                    count={10}
                    value={this.props.reviewMark}
                    size={60}

                />
                    <Card.Text className="review-text">
                        {this.props.reviewComment}
                        {/*<h3>{this.state.order.part}</h3>*/}
                        {/*<h3>{this.state.order.price}</h3>*/}
                        {/*<h3>{this.state.tattoo.picture}</h3>*/}
                    </Card.Text>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.getReviews()}
            </>
        );
    }
}