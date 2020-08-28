import React from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import "../css/TattooBlock.css"
import SwipeableTextMobileStepper from "./Test";

export default class StyleBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="out-card">
                <Link to={`/tattoo/${this.props.item.id}`}>
                    <Card className="card"
                          border="dark"
                          bg="light">
                        <Card.Body>
                            <SwipeableTextMobileStepper styleId = {this.props.item.id}/>
                            <Card.Title className="title-card-name">{this.props.item.style}</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    }
}
