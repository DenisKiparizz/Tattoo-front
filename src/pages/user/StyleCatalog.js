import React from 'react';
import Header from "../../components/Header";
import Slider from "react-slick";
import StyleService from "../../services/style-service"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Slick.css"
import "../../css/TattooBlock.css"
import Footer from "../../components/Footer";
import StyleBlock from "../../components/StyleBlock";
import "../../css/Tattoo.css"
import ImageList from "../../components/ImageList";


export default class StyleCatalog extends React.Component {
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
                this.setState({
                    allStyles: allStyles
                })
            })
    }

    getTattoo = () => this.state.allStyles.map(element => {
        return (
            <div className="dashboard-image">
                <StyleBlock key={element.id}
                            item={element}/>
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
            <div className="base">
                <Header/>
                <h1 className="style-title">Select your favorite style</h1>
                <Slider {...settings}>
                    {this.getTattoo()}
                </Slider>
                <h1 className="stylePage-title">Our works</h1>
                <div className="slide">
                    <ImageList/>
                </div>
                <Footer/>
            </div>
        );
    }
}
