import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/HomePage.css"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="mnd-supertop-box ">
                <Header/>
                <h1 className="home-title">This is home page</h1>
                {/*<Footer/>*/}
            </div>
        );
    }
}

export default HomePage;
