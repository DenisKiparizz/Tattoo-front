import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BoardUser from "./components/header/board-user.component";
import BoardModerator from "./components/header/board-moderator.component";
import BoardAdmin from "./components/header/board-admin.component";
import HomePage from "./pages/HomePage";
import Catalog from "./pages/Catalog";
import Tattoo from "./pages/Tattoo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                    <Switch>
                        <Route exact path={["/", "/home"]} component={HomePage}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/catalog" component={Catalog}/>
                        <Route exact path="/tattoo/:id"
                               render={(props) => {
                                   return (<Tattoo {...props}/>)
                               }} component={Tattoo}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>
                        <Route path="/admin" component={BoardAdmin}/>
                    </Switch>
            </Router>
        );
    }
}
