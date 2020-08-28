import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import TattooService from "../services/tattoo-service"
import Card from "react-bootstrap/Card";


class SwipeableTextMobileStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTattoo: []
        }
    }

    componentDidMount() {
        TattooService.getTattooByStyleId(this.props.styleId)
            .then(response => {
                let allStyles = response.data
                this.setState({
                    allTattoo: allStyles
                })
            })
    }

    getRes = () => this.state.allTattoo.map(res => {
        const styleImg = {
            root: {
                maxWidth: 400,
                flexGrow: 1,
            },
            img: {
                height: 255,
                display: 'block',
                maxWidth: 600,
                overflow: 'hidden',
                width: '100%',
            },
        };

        return (
            <>
                <Card.Img  style={styleImg.img} src={res.pictureUrl}/>
            </>
        )
    })


    render() {
        const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

        return (
            <div>
                <AutoPlaySwipeableViews>
                    {this.getRes()}
                </AutoPlaySwipeableViews>
            </div>
        );
    }
}

export default SwipeableTextMobileStepper;
