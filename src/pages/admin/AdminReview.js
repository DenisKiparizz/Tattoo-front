import React from 'react';
import Header from "../../components/Header";
import AdminReviewContent from "../../components/AdminReviewContent";
import ReviewService from "../../services/review-service";
import Table from "react-bootstrap/Table";
import {MDBTableBody, MDBTableHead} from "mdbreact";

export default class AdminReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            orderId: ""
        }
    }

    componentDidMount() {
        ReviewService.getReview()
            .then(res => {
                this.setState({
                    reviews: res.data,
                })
            })
    }

    getReview=()=>this.state.reviews.map(review=>{
        return(
            <AdminReviewContent item={review}
                                orderId={review.orderId}
            />
        )
    })

    render() {
        return (
            <div>
                <Header/>
                <h1>All Review</h1>
                <Table>
                    <MDBTableHead>
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Part of Body</th>
                            <th>Picture</th>
                            <th>Comment</th>
                            <th>Mark</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.getReview()}
                    </MDBTableBody>
                </Table>
            </div>
        );
    }
}