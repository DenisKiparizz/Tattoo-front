import React from 'react';
import Header from "../../components/Header";
import TattooService from "../../services/tattoo-service"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class EditCreateTattoo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",
            pictureUrl: "",
            description: "",
            cost: "",
            style: {id: ""},

            successful: false,
            message: ""
        };
        this.initial(this.props.match.params.id)
    }

    initial = (id) => {
        if (id) {
            TattooService.getTattooById(this.props.match.params.id)
                .then(resp => {
                    this.setState({
                        picture: resp.data.picture,
                        pictureUrl: resp.data.pictureUrl,
                        description: resp.data.description,
                        cost: resp.data.cost,
                        style: {id: resp.data.style.id},
                    })
                })
        }
    }

    onHandleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onChangeStyle = (e) => {
        this.setState({
            style: {id: e.target.value}
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            TattooService.updateTattoo(
                this.props.match.params.id,
                this.state.picture,
                this.state.pictureUrl,
                this.state.description,
                this.state.cost,
                this.state.style
            ).then(() => {
                window.location.href = "/adminTattoo"
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

    handleSave = (e) => {
        e.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            TattooService.createTattoo(
                this.state.picture,
                this.state.pictureUrl,
                this.state.description,
                this.state.cost,
                this.state.style
            ).then(() => {
                window.location.href = "/adminTattoo"
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

    title = () => {
        return (this.props.match.params.id)
            ? (<>Update</>)
            : (<>Create</>)
    }

    getResult = () => {
        return (this.props.match.params.id)
            ? (this.handleUpdate)
            : (this.handleSave)
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>{this.title()}</h1>
                <Form onSubmit={this.getResult()}
                      ref={check => {
                          this.form = check;
                      }}>
                    <div>
                        <label>picture</label>
                        <Input
                            className="form-control"
                            name="picture"
                            value={this.state.picture}
                            onChange={this.onHandleChange}
                            validations={[required]}
                        />
                        <div className="form-group">
                            <label htmlFor="pictureUrl">pictureUrl</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="pictureUrl"
                                value={this.state.pictureUrl}
                                onChange={this.onHandleChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="description"
                                value={this.state.description}
                                onChange={this.onHandleChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cost">cost</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="cost"
                                value={this.state.cost}
                                onChange={this.onHandleChange}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="style">style</label>
                            <Input
                                type="number"
                                className="form-control"
                                name="style"
                                value={(this.state.style.id)}
                                onChange={this.onChangeStyle}
                                validations={[required]}
                            />
                        </div>
                    </div>
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

                    <div className="form-group">
                        <button className="btn btn-primary btn-block"
                                disabled={this.state.successful}>
                            {this.title()}
                        </button>
                    </div>

                    <CheckButton
                        style={{display: "none"}}
                        ref={check => {
                            this.checkBtn = check;
                        }}
                    />
                </Form>
                <div className="form-group">
                    <button onClick={() => window.location.href = "/adminTattoo"}
                            className="btn btn-danger btn-block">
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
}
