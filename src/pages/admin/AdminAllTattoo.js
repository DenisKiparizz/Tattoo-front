import React from "react";
import Header from "../../components/Header";
import TattooService from "../../services/tattoo-service"
import {MDBTableBody, MDBTableHead} from 'mdbreact';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer";
import {ButtonGroup} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/core/styles';


export default class BoardAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allTattoo: [],
            tattooId: ''
        };
    }

    componentDidMount() {
        TattooService.getAllTattoo()
            .then(res => {
                let all = res.data;
                localStorage.setItem("allTattoo", JSON.stringify(all))
                this.setState({
                    allTattoo: all,
                })
            })
    }

    createOrUpdate(id) {
        (id)
            ? this.props.history.push(`/edit/${id}`)
            : this.props.history.push(`/edit`)
    }

    delete(id) {
        TattooService.deleteTattoo(id)
            .then(() => {
                let updatedGroups = [...this.state.allTattoo].filter(i => i.id !== id);
                this.setState({
                    allTattoo: updatedGroups
                })
            })
    }


    getResult = () => this.state.allTattoo.map(element => {

        return (
            <>
                <tr>
                    <td>{element.id}</td>
                    <td>{element.picture}</td>
                    <td>{element.description}</td>
                    <td>{element.style.style}</td>
                    <td>{element.cost}</td>
                    <td>
                        <ButtonGroup>
                            <Button variant="danger" onClick={() => this.delete(element.id)}>Delete</Button>
                            <Button variant="success" onClick={() => this.createOrUpdate(element.id)}>Update</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            </>
        )
    })

    render() {
        return (
            <div>
                <Header/>
                <Table>
                    <MDBTableHead>
                        <tr>
                            <th>Id</th>
                            <th>Picture</th>
                            <th>Description</th>
                            <th>Style</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.getResult()}
                    </MDBTableBody>
                </Table>
                <Button size="sm" variant="success" onClick={() => this.createOrUpdate()}>Crete</Button>
                <Footer/>
            </div>
        );
    }
}

