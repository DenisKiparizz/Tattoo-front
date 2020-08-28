import React from 'react';
import Header from "../../components/Header";
import TattooService from "../../services/tattoo-service";
import TattooBlock from "../../components/TattooBlock";
import StyleService from "../../services/style-service"
import Footer from "../../components/Footer";
import "../../css/Tattoo.css"

class Tattoo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleName: "",
            tattoo: []
        }
    }

    componentDidMount() {
        StyleService.getAllStyle().then(response => {
            let styleName = response.data.filter(response => response.id == this.props.match.params.id)
                .map(response => response.style);
            TattooService.getTattooByStyleId(this.props.match.params.id)
                .then(response => {
                    let tattoo = response.data
                    this.setState({
                        tattoo: tattoo,
                        styleName: styleName
                    })
                })
        })
    }

    getTattooWithThisStyle = () => this.state.tattoo.map(resp => {
        return (
            <div>
                <TattooBlock key={resp.id}
                             item={resp}/>
            </div>
        )
    })

    render() {
        return (
            <div className="base">
                <Header/>
                <h1 className="style-title"> {this.state.styleName}</h1>
                {this.getTattooWithThisStyle()}
                <Footer/>
            </div>
        );
    }
}

export default Tattoo;
