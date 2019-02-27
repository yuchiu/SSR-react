import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import { matchPath } from "react-router-dom";

import routes from "../common/components/routes";
import App from "../common/components/index";

const app = express();
const PORT = process.env.PORT || 3030;

/* middlewares */
app.use(bodyParser.json());
app.use(express.static("build/public"));

app.get("*", (req, res, next) => {
  // match the requested routes with our client routes
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  // fetch initial data iff the fetchInitialData func exist, resolve promise otherwise
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then(data => {
      const content = renderToString(
        <StaticRouter>
          <App data={data} />
        </StaticRouter>
      );
      const helmet = Helmet.renderStatic();
      const html = `<html>
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
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
