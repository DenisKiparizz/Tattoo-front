import React, {Component} from 'react';
import TattooService from "../services/tattoo-service";
import Header from "../components/Header";
import Profile from "./Profile";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="App">
                <Header/>
                <h1>This is home page</h1>
            </div>
        );
    }
}

export default HomePage;
