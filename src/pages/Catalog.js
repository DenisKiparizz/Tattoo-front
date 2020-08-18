import React, {Component} from 'react';
import Header from "../components/Header";
import Slider from "react-slick";
import StyleService from "../services/style-service"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slick.css"
import StyleBlock from "../components/StyleBlock";
import "../css/LearningPathBlock.css"


export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStyles: []
        }
    }

    componentDidMount() {
        StyleService.getAllStyle()
            .then(response => {
                let allStyles = response.data
                localStorage.setItem("allStyles", JSON.stringify(allStyles))
                this.setState({
                    allStyles: allStyles
                })
            })
    }

    getTattoo = () => this.state.allStyles.map(element => {
        return (
            <div className="dashboard-image">
                <StyleBlock key={element.id} item={element}/>
            </div>
        )
    })

    render() {

        const settings = {
            class: "slick",
            arrows: true,
            dots: true,
            infinite: true,
            centerMode: true,
            rows: 1,
            slidesPerRow: 3
        };
        return (

            <div>
                <Header/>
                <h1>This is all Tattoo</h1>
                <Slider {...settings}>
                    {this.getTattoo()}
                </Slider>
            </div>
        );
    }
}
