import React from 'react';
import TattooService from "../services/tattoo-service";
import UserService from "../services/users-service";

class AdminOrderTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            tattoo: [],
            style: [],
            user: []
        }
    }

    componentDidMount() {
        TattooService.getTattooById(this.props.data.tattooId)
            .then(resp => {
                let tattoo = resp.data;
                this.setState({
                    order: this.props.data,
                    tattoo: tattoo,
                    style: tattoo.style.style,
                })
            })
        UserService.getUserById(this.props.data.userId)
            .then(resp => {
                let user = resp.data;
                this.setState({
                    user: user.email
                })
            })
    }

    render() {
        return (
            <>
                <td>{this.state.order.id}</td>
                <td>{this.state.order.part}</td>
                <td>{this.state.order.price}</td>
                <td>{this.state.order.userId}</td>
                <td>{this.state.user}</td>
                <td>{this.state.order.tattooId}</td>
                <td>{this.state.tattoo.picture}</td>
                <td>{this.state.style}</td>
                <td>{this.props.date.getUTCDate()}-{this.props.date.getUTCMonth()}-{this.props.date.getFullYear()}</td>
                <td>{this.props.status}</td>
            </>
        );
    }
}

export default AdminOrderTable;
