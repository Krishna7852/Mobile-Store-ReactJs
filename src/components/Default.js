import React, { Component } from "react";

class Default extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
              <h1 className="display-4">404</h1>
              <h1>error</h1>
              <h2>Page not found</h2>
              <h3>
                the requested URL{" "}
                <span className="text-danger">{pathname}</span> was not found
              </h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Default;
