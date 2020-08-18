import React, {Component} from 'react';
import Card from "react-bootstrap/Card";

export default class TattooBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="out-card">
                <Card
                    className="card"
                    border="dark"
                    bg="light">

                    <Card.Body>
                        <Card.Title className="title-card-name">{this.props.item.picture}</Card.Title>
                        <Card.Img src={this.props.item.pictureUrl}/>
                        <Card.Text>{this.props.item.description}</Card.Text>
                        <Card.Subtitle>{this.props.item.cost}</Card.Subtitle>
                    </Card.Body>

                </Card>
            </div>
        );
    }
}
