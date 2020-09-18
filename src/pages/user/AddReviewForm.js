import React from 'react';
import Header from "../../components/Header";
import ReviewService from "../../services/review-service"
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import ReactStars from "react-rating-stars-component";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "react-bootstrap/Button";
import "../../css/ReviewForm.css"
import Footer from "../../components/Footer";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class AddReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: [],
            comment: "",
            mark: "",

            successful: false,
            message: ""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState(
            {
                currentUser: currentUser,
            })
    }

    getResult = (e) => {
        e.preventDefault()
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            ReviewService.createReview(
                this.state.comment,
                this.state.mark,
                this.props.match.params.id,
                this.state.currentUser.id
            )
                .then(() => {
                    window.location.href = "/"
                }).then(response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    })
                }, error => {
                    const resMessage = (error.response
                        && error.response.data
                        && error.response.data.message)
                        || error.message
                        || error.toString();
                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            )
        }
    }

    onHandleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    ratingChanged = (newRating) => {
        this.setState({
            mark: newRating
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <Form onSubmit={this.getResult}
                      className="review-form"
                      ref={check => {
                          this.form = check;
                      }}>
                    <>
                        <label className="titles">Comment</label>
                        <p>Write some worlds about our job</p>
                        <Input
                            type="text"
                            className="form-control"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.onHandleChange}
                            validations={[required]}
                            rows="5"
                        />
                        <label className="titles">Mark</label>
                        <p>Estimate our job please</p>
                        <ReactStars
                            count={10}
                            name="mark"
                            value={this.state.mark}
                            onChange={this.ratingChanged}
                            size={50}
                            activeColor="#ffd700"
                        />
                    </>
                    {this.state.message && (
                        <div className="form-group">
                            <div className={
                                this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                                 role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                    <Button type="submit"
                            className="review-btn"
                            fullWidth
                            variant="warning"
                            color="primary">
                        Submit Revier
                    </Button>
                    <CheckButton
                        style={{display: "none"}}
                        ref={check => {
                            this.checkBtn = check;
                        }}
                    />
                </Form>
                <Footer/>
            </div>
        );
    }
}