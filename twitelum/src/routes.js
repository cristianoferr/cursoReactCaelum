import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Notfound from "./pages/Notfound";
//import Login from "./Login";

class PrivateRoute extends Route {
    estaAutenticado = () => {
        return !!localStorage.getItem('TOKEN');
    }

    render() {
        const { component: Component, ...props } = this.props;

        if (this.estaAutenticado()) {
            return <Component {...props} />
        } else {
            return <Redirect to="/login" />
        }
    }
}

const Roteamento = () => {
    return (
        <Switch>
            <Route path="/Login" component={LoginPage} />
            <PrivateRoute path="/" component={Home} exact />
            <Route component={Notfound} />
        </Switch>
    )
}
export default Roteamento;