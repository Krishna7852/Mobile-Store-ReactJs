import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";

/**
 * @description This will render the content
 * inside add to cart button
 * contained within figure element
 * based on boolean value
 *
 * @return jsx elements
 */
const btnContent = inCart =>
  inCart ? (
    <p className="text-capitalize mb-0" disabled>
      in cart
    </p>
  ) : (
    <i className="fas fa-cart-plus" />
  );

/**
 * @description renders jsx element for card element
 * @param {*} id
 * @param {*} img
 * @param {*} title
 * @param {*} inCart
 * @param {*} context
 * @return jsx element
 */
const cardContent = (
  id,
  img,
  title,
  inCart,
  { handleDetail, addToCart, openModal }
) => (
  <div className="img-container p-5" onClick={() => handleDetail(id)}>
    <Link to="/details">
      <img src={img} alt={title} className="card-img-top" />
    </Link>
    <button
      className="cart-btn"
      disabled={inCart}
      onClick={() => {
        addToCart(id);
        openModal(id);
      }}
    >
      {btnContent(inCart)}
    </button>
  </div>
);

/**
 * @description Product component
 * @param {*} properties
 * @return jsx elements
 */
const Product = ({ product: { id, title, img, price, inCart } }) => {
  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <figure className="card">
        {/* card content */}
        <ProductConsumer>
          {cardContent.bind(this, id, img, title, inCart)}
        </ProductConsumer>
        {/* end card content */}
        {/* Card footer */}
        <figcaption className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="text-blue font-italic mb-0">
            <span className="mr-1">{process.env.REACT_APP_CURRENCY}</span>
            {price}
          </h5>
        </figcaption>
      </figure>
    </ProductWrapper>
  );
};

// Typechecking for property passed into this component
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    inCart: PropTypes.bool.isRequired,
    company: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
  }).isRequired
};

// Styled component
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(247, 247, 247);
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
  }

  .img-container:hover .card-img-top {
    transition: all 1s linear;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
  }

  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }

  .cart-btn:hover {
    cursor: pointer;
    color: var(--mainBlue);
  }
`;

export default Product;
