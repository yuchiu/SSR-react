import "babel-polyfill"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"

import App from "./components/index"

const app = express()
const PORT = process.env.PORT || 3030

/* middlewares */
app.use(bodyParser.json())
app.use(express.static("build"))

app.get("*", (req, res)=>{
    const context = {}
    const content = renderToString(
        <StaticRouter>
            <App/>
        </StaticRouter>
    )
    const html = `
        <html>
            <head>
                <title>Test Repo</title>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>`
    res.send(html)
})

app.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})