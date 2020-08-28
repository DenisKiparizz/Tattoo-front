import React from 'react';
import Header from "./Header";
import TattooService from "../services/tattoo-service"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export default class EditCreateTattoo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",
            pictureUrl: "",
            description: "",
            cost: "",
            style: {id: ""},

            successful: true,
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
        TattooService.updateTattoo(
            this.props.match.params.id,
            this.state.picture,
            this.state.pictureUrl,
            this.state.description,
            this.state.cost,
            this.state.style
        )
            .then(() => {
                this.setState({
                    successful: true
                })
            })
            .then(() => {
                window.location.href = "/adminTattoo"
            })
    }

    handleSave = (e) => {
        e.preventDefault();
        TattooService.createTattoo(
            this.state.picture,
            this.state.pictureUrl,
            this.state.description,
            this.state.cost,
            this.state.style
        ).then(() => {
            this.setState({
                successful: true
            });
        })
            .then(() => {
                window.location.href = "/adminTattoo"
            })
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
                <Form onSubmit={this.getResult()}>
                    <label>picture</label>
                    <Input
                        className="form-control"
                        name="picture"
                        value={this.state.picture}
                        onChange={this.onHandleChange}
                    />
                    <div className="form-group">
                        <label htmlFor="pictureUrl">pictureUrl</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="pictureUrl"
                            value={this.state.pictureUrl}
                            onChange={this.onHandleChange}
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
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">{this.title()}</button>
                    </div>
                </Form>
            </div>
        )
    }
}
