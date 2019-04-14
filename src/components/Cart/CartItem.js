import React from "react";
import PropTypes from "prop-types";

const CartItem = ({
  item: { id, title, img, price, total, count },
  value: { increment, decrement, removeItem }
}) => {
  return (
    <div className="row my-2 text-capitalize text-center">
      {/* product image */}
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          alt={title}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
        />
      </div>
      {/* product title */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product :</span> {title}
      </div>
      {/* product price */}
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price :</span>{" "}
        {process.env.REACT_APP_CURRENCY}
        {price}
      </div>
      {/* product quantity */}
      <div className="col-10 mx-auto col-lg-2">
        <div className="d-flex justify-content-center">
          <div>
            <span
              className="btn btn-black mx-1"
              onClick={decrement.bind(this, id)}
            >
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span
              className="btn btn-black mx-1"
              onClick={increment.bind(this, id)}
            >
              +
            </span>
          </div>
        </div>
      </div>
      {/* product remove */}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={removeItem.bind(this, id)}>
          <i className="fas fa-trash " />
        </div>
      </div>
      {/* product total */}
      <div className="col-10 mx-auto col-lg-2 font-weight-bold">
        <span>item total : {process.env.REACT_APP_CURRENCY} </span> {total}
      </div>
    </div>
  );
};

// Typechecking for property passed into this component
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    inCart: PropTypes.bool.isRequired,
    company: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.shape({
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  }).isRequired
};

export default CartItem;
