import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

class Details extends Component {
  showDetail = ({
    detailProduct: { id, company, title, img, info, price, inCart },
    addToCart,
    openModal
  }) => (
    <section>
      <div className="container">
        {/* Title */}
        <div className="row">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1>{title}</h1>
          </div>
        </div>
        {/* End title */}
        {/* product info */}
        <article className="row">
          {/* product image */}
          <div className="col-10 mx-auto col-md-6 my-3">
            <img src={img} alt={title} className="img-fluid" />
          </div>
          {/* end product text */}
          {/* product text */}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>model: {title}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              made by: <span className="text-uppercase">{company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                price: <span>{process.env.REACT_APP_CURRENCY}</span>
                {price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              some info about the product:
            </p>
            <p className="text-muted lead">{info}</p>
            {/* links */}
            <div>
              <Link to="/">
                <ButtonContainer>back to products</ButtonContainer>
              </Link>
              <ButtonContainer
                cart
                disabled={inCart}
                onClick={() => {
                  addToCart(id);
                  openModal(id);
                }}
              >
                {inCart ? "in cart" : "add to cart"}
              </ButtonContainer>
            </div>
          </div>
          {/* end product text */}
        </article>
        {/* end product info */}
      </div>
    </section>
  );

  render() {
    return <ProductConsumer>{this.showDetail}</ProductConsumer>;
  }
}

export default Details;
