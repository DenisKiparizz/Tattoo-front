import React from 'react';
import Header from "../components/Header";
import TattooService from "../services/tattoo-service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Slick.css"
import TattooBlock from "../components/TattooBlock";

class Tattoo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleName: "",
            tattoo: []
        }
    }

    componentDidMount() {
        let styleName = JSON.parse(localStorage.getItem("allStyles"))
            .filter(response => response.id == this.props.match.params.id)
            .map(response => response.style);
        TattooService.getTattooByStyleId(this.props.match.params.id)
            .then(response => {
                let tattoo = response.data
                localStorage.setItem("tattooById", JSON.stringify(tattoo))
                this.setState({
                    tattoo: tattoo,
                    styleName: styleName
                })
            })
    }


    getTattooWithThisStyle = () => this.state.tattoo.map(resp => {
        return (
            <div className="dashboard-image">
                <TattooBlock key={resp.id} item={resp}/>
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
                <h1> {this.state.styleName}</h1>
                <Slider {...settings}>
                    {this.getTattooWithThisStyle()}
                </Slider>
            </div>
        );
    }
}

export default Tattoo;
