import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CartTotals = ({
  value: { cartTotal, cartTax, cartSubTotal, clearCart }
}) => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                onClick={clearCart}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>{" "}
              <strong>
                {process.env.REACT_APP_CURRENCY} {cartSubTotal}
              </strong>{" "}
            </h5>
            <h5>
              <span className="text-title">tax :</span>{" "}
              <strong>
                {process.env.REACT_APP_CURRENCY} {cartTax}
              </strong>{" "}
            </h5>
            <h5>
              <span className="text-title">total :</span>{" "}
              <strong>
                {process.env.REACT_APP_CURRENCY} {cartTotal}
              </strong>{" "}
            </h5>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Type checking the properties passed into this component
CartTotals.propTypes = {
  value: PropTypes.shape({
    cartTotal: PropTypes.number.isRequired,
    cartTax: PropTypes.number.isRequired,
    cartSubTotal: PropTypes.number.isRequired,
    clearCart: PropTypes.func.isRequired
  }).isRequired
};

export default CartTotals;
