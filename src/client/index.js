import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Routes from "../common/components";

const app = (
  <BrowserRouter>
    <Routes data={window.__INITIAL_DATA__} />
  </BrowserRouter>
);

// use hydrate instead of render
// hydrate indicate that insteada of createing it on the client, markup is already created on the server side
// instead of recreating the markup, React will preserve it and just attach any needed event handlers to the existing server rendered markup
hydrate(app, document.getElementById("root"));
