import React from 'react';
import Header from "../components/Header";
import "../css/HomePage.css"
import Footer from "../components/Footer";
import CustomizedTimeline from "../components/HomePageTutor";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="home-colour">
                <Header/>
                <div className="mnd-supertop-box ">
                    <h1 className="home-title">This is home page</h1>
                </div>
                <CustomizedTimeline/>
                <Footer/>
            </div>
        );
    }
}

export default HomePage;
