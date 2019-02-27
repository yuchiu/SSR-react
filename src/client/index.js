import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import Routes from "../common/components"

const app = (
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
)

ReactDOM.hydrate(app,
    document.getElementById("root")
)