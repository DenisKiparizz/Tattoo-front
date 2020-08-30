import React from 'react';
import TattooService from "../services/tattoo-service";
import "../css/Images.css"
import Card from "react-bootstrap/Card";
import {autoPlay} from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

class ImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTattoo: []
        }
    }

    componentDidMount() {
        TattooService.getAllTattoo()
            .then(response => {
                let tattoo = response.data
                this.setState({
                    allTattoo: tattoo
                })
            })
    }

    getImg = () => this.state.allTattoo.map(resp => {
        const styleImg = {
            root: {
                maxWidth: 600,
                flexGrow: 2,
            },
            img: {
                height: "auto",
                display: 'block',
                maxWidth: 600,
                overflow: 'hidden',
                width: '100%',
            },
        };
        return (
            <>
                <Card.Img style={styleImg.img}
                          src={resp.pictureUrl}/>
            </>
        )
    })

    render() {
        const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
        return (
            <>
                <AutoPlaySwipeableViews>
                    {this.getImg()}
                </AutoPlaySwipeableViews>
            </>
        );
    }
}

export default ImageList;