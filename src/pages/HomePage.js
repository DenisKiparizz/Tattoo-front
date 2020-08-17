import React, {Component} from 'react';
import TattooService from "../services/tattoo-service";
import Header from "../components/Header";
import Profile from "../components/Profile";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        TattooService.getAllTattoo();
        this.setState({
            content: localStorage.getItem("allTattoo")
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>This is home page</h1>
                {/*<Profile/>*/}
            </div>
        );
    }
}

export default HomePage;
