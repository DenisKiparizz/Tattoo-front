import React from 'react';
import TattooService from "../services/tattoo-service";

export default class TattooInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            tattoo: [],
            userInfo: [],
            style: "",
            totalPrice:' '
        }
    }

    componentDidMount() {
        TattooService.getTattooById(this.props.order.tattooId)
            .then(resp => {
                let tattoo = resp.data;
                this.setState({
                    order: this.props.order,
                    tattoo: tattoo,
                    style: tattoo.style.style
                })
            })
    }

    render() {
        let date = new Date(this.props.order.created)
        return (
            <>
                <td>{this.state.order.id}</td>
                <td>{this.state.order.part}</td>
                <td>{this.state.tattoo.picture}</td>
                <td>{this.state.style}</td>
                <td>{this.state.order.price}</td>
                <td>{date.getUTCDate()}-{date.getUTCMonth()}-{date.getFullYear()}</td>
                {this.state.totalPrice}
            </>
        );
    }
}
