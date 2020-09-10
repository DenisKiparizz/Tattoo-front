import React  from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import BoardAdmin from "./pages/admin/AdminAllTattoo";
import HomePage from "./pages/HomePage";
import StyleCatalog from "./pages/user/StyleCatalog";
import Tattoo from "./pages/user/Tattoo";
import EditCreateTattoo from "./pages/admin/EditCreateTattoo";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUser from "./pages/admin/AdminUser";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={["/", "/home"]} component={HomePage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/catalog" component={StyleCatalog}/>
                    <Route exact path="/tattoo/:id"
                           render={(props) => {
                               return (<Tattoo {...props}/>)}}
                           component={Tattoo}/>
                    <Route exact path="/edit/:id" component={EditCreateTattoo}/>
                    <Route path="/edit" component={EditCreateTattoo}/>
                    <Route path="/adminTattoo" component={BoardAdmin}/>
                    <Route path="/adminOrders" component={AdminOrders}/>
                    <Route path="/adminUsers" component={AdminUser}/>
                </Switch>
            </Router>
        );
    }
}
