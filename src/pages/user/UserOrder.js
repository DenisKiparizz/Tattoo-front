import React from 'react';
import Header from "../../components/Header";
import AuthService from "../../services/auth.service";
import OrderService from "../../services/order-service";
import OrderNavBar from "../../components/OrderNavBar";
import Footer from "../../components/Footer";

export default class UserOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: [],
            allOrders: [],
            tattooPicture: "",
            tattooStyle: ""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState(
            {
                currentUser: currentUser
            })
        OrderService.getOrdersByUserId(currentUser.id)
            .then(resp => {
                let all = (resp.data);
                this.setState({
                    allOrders: all,
                })
            })
    }


    render() {
        return (
            <div>
                <Header/>
                <OrderNavBar items={this.state.allOrders}/>
                <Footer/>
            </div>
        );
    }
}

