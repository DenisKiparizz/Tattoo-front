import React from 'react';
import {withRouter} from 'react-router-dom';
import TattooService from "../services/tattoo-service";
import ReviewService from "../services/review-service";
import "../css/OrderBlock.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class OrderBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tattooPicture: "",
            tattooStyle: "",
            review: []
        }
    }

    componentDidMount = () => {
        TattooService.getTattooById(this.props.tattooId)
            .then(resp => {
                let tattoo = resp.data;
                this.setState({
                    tattooPicture: tattoo.picture,
                    tattooImage: tattoo.pictureUrl,
                    tattooStyle: tattoo.style.style
                })
            })
        ReviewService.getReviewByOrderId(this.props.id)
            .then(review => {
                this.setState({
                    review: review.data
                })
            })
    }

    addReview(id) {
        this.props.history.push(`/addReview/${id}`)
    }

    getBottomIfClosed = (status, id) => {
        if (status === "CLOSED") {
            if (this.state.review != null) {
                return (
                    <h1>Thank for your review</h1>
                )
            }
            return (
                <>
                    <h4>Hope that you happy with your tattoo. Write some words about our work</h4>
                    <Button className="review-btn"
                            variant="warning"
                            onClick={() => this.addReview(id)}
                            size="lg"
                            block disabled={false}
                    >
                        Add Review
                    </Button>
                </>
            )
        } else {
            return (
                <h1 className="title-message">Please wait when mr Admin apply your order</h1>
            )
        }

        // return ((status === "CLOSED")
        //         ?
        //         <>
        //             <h4>Hope that you happy with your tattoo. Write some words about our work</h4>
        //             <Button className="review-btn"
        //                     variant="warning"
        //                     onClick={() => this.addReview(id)}
        //                     size="lg"
        //                     block disabled={false}
        //             >
        //                 Add Review
        //             </Button></>
        //         :
        //         <h1 className="title-message">Please wait when mr Admin apply your order</h1>
        // )
    }

    getEachOrder = () => {
        return (
            <div className="order-block">
                <h1 className="title">{this.state.tattooPicture}</h1>
                <Card.Img className="order-image" src={this.state.tattooImage}/>
                <div className="all-text">
                    <h1>{this.props.id}</h1>
                    <h1>{this.props.partOfBody}</h1>
                    <h1>{this.state.tattooStyle}</h1>
                    <h1>{this.props.price}</h1>
                </div>
                {this.getBottomIfClosed(this.props.status, this.props.id)}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.getEachOrder()}
            </div>
        );
    }
}

export default withRouter(OrderBlock);

