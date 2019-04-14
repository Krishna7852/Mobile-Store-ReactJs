import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/cart" component={Cart} />
            <Route component={Default} />
          </Switch>
          <Modal />
        </main>
      </Fragment>
    );
  }
}

export default App;
