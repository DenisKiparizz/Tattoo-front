import React from 'react';
import Header from "../../components/Header";
import ReviewService from "../../services/review-service";
import ReviewEnvironment from "../../components/ReviewEnviroment";
import Slider from "react-slick";

export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        ReviewService.getReview()
            .then(res => {
                this.setState({
                    reviews: res.data
                })
            })
    }

    getReview = () => this.state.reviews.map(resp => {
        return (
            <ReviewEnvironment reviewId={resp.id}
                               reviewComment={resp.comment}
                               reviewOrderId={resp.orderId}
                               reviewMark={resp.mark}
                               all={resp}

            />
        )
    })


    render() {
        const settings = {
            class: "slick",
            arrows: true,
            dots: true,
            infinite: true,
            centerMode: true,
            rows: 1,
            slidesPerRow: 1
        };
        return (
            <div>
                <Header/>
                <Slider {...settings}>
                    {this.getReview()}
                </Slider>
            </div>
        );
    }
}
