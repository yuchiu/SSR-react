import React from "react"
import { Switch, Route } from "react-router"

import LandingPage from "./LandingPage"

class Routes extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/" component={LandingPage}/>
            </Switch>
        )
    }
}

export default Routes