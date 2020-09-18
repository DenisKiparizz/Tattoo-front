import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import OrderBlock from "./OrderBlock";

export default class OrderNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tattooPicture: "",
            tattooStyle: ""
        }
    }

    getBlock = (filterParam) => this.props.items.filter(filterParam).map(element => {
        return (
            <>
                <OrderBlock id={element.id}
                            partOfBody={element.part}
                            tattooId={element.tattooId}
                            status={element.status}
                            price={element.price}
                />
            </>
        )
    })

    render() {
        return (
            <div>
                <Tabs className="tabs" aria-label="simple tabs example">
                    <Tab eventKey="materials" label="ALL ORDERS" title="ALL ORDERS">
                        {this.getBlock(el => true)}
                    </Tab>
                    <Tab eventKey="active" label="ACTIVE" title="ACTIVE">
                        {this.getBlock(el => el.status === "ACTIVE")}
                    </Tab>
                    <Tab eventKey="closed" label="CLOSED" title="CLOSED">
                        {this.getBlock(el => el.status === "CLOSED")}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}