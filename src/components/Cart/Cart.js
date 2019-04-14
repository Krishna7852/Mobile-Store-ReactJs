import React, { Component, Fragment } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {({
            cart,
            increment,
            decrement,
            removeItem,
            cartTotal,
            cartTax,
            cartSubTotal,
            clearCart
          }) =>
            cart.length > 0 ? (
              <Fragment>
                <div className="container">
                  <Title name="your" title="cart" />
                </div>
                <CartColumns />
                <CartList value={{ cart, increment, decrement, removeItem }} />
                <CartTotals
                  value={{ cartTotal, cartTax, cartSubTotal, clearCart }}
                />
              </Fragment>
            ) : (
              <EmptyCart />
            )
          }
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
