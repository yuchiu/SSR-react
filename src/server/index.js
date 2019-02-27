import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";

import App from "../common/components/index";

const app = express();
const PORT = process.env.PORT || 3030;

/* middlewares */
app.use(bodyParser.json());
app.use(express.static("build/public"));

app.get("*", (req, res) => {
  const context = {};
  const data = { name: "Stranger" };
  const content = renderToString(
    <StaticRouter>
      <App data={data} />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  const html = `
        <!DOCTYPE html>
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <script src="client_bundle.js" defer></script>
                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
