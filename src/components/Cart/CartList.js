import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

const CartList = ({ value: { cart, increment, decrement, removeItem } }) => (
  <div className="container-fluid">
    {cart.map(item => (
      <CartItem
        key={item.id}
        item={item}
        value={{ increment, decrement, removeItem }}
      />
    ))}
  </div>
);

// Typechecking for property passed into this component
CartList.propTypes = {
  value: PropTypes.shape({
    cart: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        inCart: PropTypes.bool.isRequired,
        company: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired
      })
    ).isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  }).isRequired
};

export default CartList;
