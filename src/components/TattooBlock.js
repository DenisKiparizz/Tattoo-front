import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OrderService from "../services/order-service"
import AuthService from "../services/auth.service";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import TattooService from "../services/tattoo-service";
import InputLabel from "@material-ui/core/InputLabel";
import "../css/OrderWindow.css"

class TattooBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successful: "",
            currentUser: [],
            allOrders: [],
            status: false,

            tattooStyle: [],
            part: '',
            open: false,
            setOpen: false
        }
    }

    onHandleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState(
            {
                currentUser: currentUser,
                userReady: true
            })
        TattooService.getTattooById(this.props.item.id)
            .then(resp => {
                let tattoo = resp.data;
                this.setState({
                    tattooStyle: tattoo.style.style
                })
            })
        OrderService.getOrdersByUserId(currentUser.id)
            .then(resp => {
                let all = resp.data;
                this.setState({
                    allOrders: all,
                })
            })
    }

    createOrder = (e) => {
        e.preventDefault();
        OrderService.createOrder(this.state.part, this.props.item.id, this.state.currentUser.id)
            .then(() => this.consthandleClose())
            .then(() => {
                OrderService.getOrdersByUserId(this.state.currentUser.id)
                    .then(resp => {
                        this.setState({
                            allOrders: resp.data,
                        })
                    })
                this.setState({
                    successful: true
                });
            })

    }

    delete = (id) => {
        OrderService.deleteOrder(id)
            .then(() => {
                let updatedGroups = this.state.allOrders.filter(i => i.id !== id);
                this.setState({
                    allOrders: updatedGroups
                })
            }).then(() => {
            this.setState({
                successful: false
            });
        })
    }

    consthandleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    consthandleClose = () => {
        this.setState({
            setOpen: false,
            open: false
        })
    }

    getDialogWindow = () => {
        return (
            <Dialog
                className="window"
                open={this.state.open}
                onClose={this.consthandleClose}>
                <DialogTitle>Submit Order</DialogTitle>
                <DialogContent>
                    <h3>Tattoo Picture:
                        <div className="text-order">
                            {this.props.item.picture}
                        </div>
                    </h3>
                    <h3>Tattoo Style:
                        <div className="text-order">
                            {this.state.tattooStyle}
                        </div>
                    </h3>
                    <h2>Cost:
                        <div className="text-order">
                            {this.props.item.cost}
                        </div>
                    </h2>
                    <InputLabel>Select part of body</InputLabel>
                    <Select
                        typeof="text"
                        name="part"
                        autoFocus
                        value={this.state.part}
                        onChange={this.onHandleChange}>

                        <MenuItem value="FOOT">FOOT</MenuItem>
                        <MenuItem value="LEG">LEG</MenuItem>
                        <MenuItem value="ARM">ARM</MenuItem>
                        <MenuItem value="HAND">HAND</MenuItem>
                        <MenuItem value="STOMACH">STOMACH</MenuItem>
                        <MenuItem value="CHEST">CHEST</MenuItem>
                        <MenuItem value="NECK">NECK</MenuItem>
                    </Select>
                    <div className="errors">
                        {(!this.state.part)
                            ? <p>Part has to be full</p>
                            : null}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.consthandleClose}
                            variant={"danger"}
                    >
                        Cancel
                    </Button>
                    <Button onClick={this.createOrder}
                            variant={"success"}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        let status = false;
        let orderId;
        const showButton = () => this.state.allOrders.map(resp => {
            if (resp.tattooId === this.props.item.id && resp.status !== "CLOSED") {
                status = true;
                orderId = resp.id
            }
        })

        const getStyle = () => {
            showButton()
            const asign = {
                background: '#fae9e9',
                boxShadow: '0 0 2px 3px  red'
            }
            return (status) ? asign : null
        }

        return (
            <div className="block"
                 style={getStyle()}>
                <div className="layer1">
                    <Card.Title>{this.props.item.picture}</Card.Title>
                    <Card.Img className="tattoo-img" src={this.props.item.pictureUrl}/>
                </div>
                <div className="layer2">
                    {this.props.item.description}
                    <Card.Title>{this.props.item.cost}</Card.Title>
                    {showButton()}
                    {(status)
                        ?
                        <Button
                            onClick={() => this.delete((orderId))}
                            variant={"warning"}
                            size="lg"
                            block disabled={false}>
                            Delete from order
                        </Button>
                        :
                        <Button onClick={() => this.consthandleClickOpen()}
                                variant={"success"}
                                size="lg" block disabled={false}>
                            Add to order
                        </Button>
                    }
                </div>
                {this.getDialogWindow()}
            </div>
        );
    }
}

export default TattooBlock;

