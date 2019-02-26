import "babel-polyfill"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import { Helmet } from "react-helmet"

import App from "../common/components/index"

const app = express()
const PORT = process.env.PORT || 3030

/* middlewares */
app.use(bodyParser.json())
app.use(express.static("build/public"))

app.get("*", (req, res)=>{
    const context = {}
    const content = renderToString(
        <StaticRouter>
            <App/>
        </StaticRouter>
    )
    const helmet = Helmet.renderStatic();
    const html = `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="client_bundle.js"></script>
            </body>
        </html>`
    res.send(html)
})

app.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})