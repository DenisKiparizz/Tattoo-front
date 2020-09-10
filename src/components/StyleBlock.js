import React from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import "../css/TattooBlock.css"
import japanise from "../images/Japanise.jpg"
import chicano from "../images/Chikano.png"
import oldSchool from "../images/OldSchool.jpg"
import traditional from "../images/Traditional.jpg"
import logo from "../images/Logo.png"


export default class StyleBlock extends React.Component {

    getAppropriateImage = (style) => {
        switch (style) {
            case "JAPANESE":
                return japanise
            case "CHICANO":
                return chicano
            case "OLD SCHOOL":
                return oldSchool
            case "TRADITIONAL":
                return traditional
            default:
                return logo
        }
    }

    render() {
        return (
            <div className="out-card">
                <Link to={`/tattoo/${this.props.item.id}`}>
                    <Card className="card"
                          border="dark"
                          bg="light">
                        <Card.Body>
                            {/*<SwipeableTextMobileStepper styleId={this.props.item.id}/>*/}
                            <Card.Img variant="top" src={this.getAppropriateImage(this.props.item.style)}/>
                            <Card.Title>{this.props.item.style}</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    }
}
