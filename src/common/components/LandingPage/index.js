import React from "react";
import { Helmet } from "react-helmet";

const Header = () => (
  <Helmet>
    <title>Test Repo</title>
  </Helmet>
);

class LandingPage extends React.Component {
  printConsole() {
    console.log("hello world");
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Header />
        <h1>Landing Page</h1>
        <button onClick={this.printConsole.bind(this)}>Print in Console</button>
        <div>Select a language</div>
      </div>
    );
  }
}

export default LandingPage;
