import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {({ modalOpen, closeModal, modalProduct: { img, title, price } }) => {
          return !modalOpen ? null : (
            <ModalContainer
              className="d-flex justify-content-center align-items-center"
              onClick={closeModal}
            >
              <div className="container">
                <div className="row">
                  <div
                    id="modal"
                    className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    onClick={e => e.stopPropagation()}
                  >
                    <h5 className="card-title">Item added to the cart</h5>
                    <img src={img} alt={title} className="img-fluid" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">
                      price: {process.env.REACT_APP_CURRENCY}
                      {price}
                    </h5>
                    <Link to="/">
                      <ButtonContainer onClick={closeModal}>
                        store
                      </ButtonContainer>
                    </Link>
                    <Link to="/cart">
                      <ButtonContainer cart onClick={closeModal}>
                        go to the cart
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </ModalContainer>
          );
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
  #modal {
    position: relative;
    background: var(--mainWhite);
    z-index: 99;
  }
`;

export default Modal;
