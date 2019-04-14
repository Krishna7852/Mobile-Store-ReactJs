import React, { PureComponent, createContext } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

// Locally stored cart
const cart = JSON.parse(localStorage.getItem("cart"));

class Productprovider extends PureComponent {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount = () => {
    this.setProducts();
  };

  /**
   * @description   Fetches products data and updates the state
   *                with those data
   *
   * @return        void
   */
  setProducts = () => {
    const products = this.deepCopiedProducts(storeProducts);

    // Update the state to change the products
    this.setState(
      () => ({ products }),
      () => this.setCartAndProductsAfterPageRefresh()
    );
  };

  /**
   * @description     This function checks if user refreshed the page
   *                  while adding item ins cart. If yes then get those cart item
   *                  from localstorage
   *                  to context state to let the child component know
   *                  about the items in cart
   *
   * @return          void
   */
  setCartAndProductsAfterPageRefresh = () => {
    // Set the cart after page refresh
    if (cart !== null) {
      // If local cart is not null update the context state cart
      this.setState(
        () => ({ cart }),
        () => this.checkProductOfProductsInCartAfterPageRefresh()
      );
    } else {
      this.setState({ cart: [] });
    }
  };

  /**
   * @description   This function checks which product of the products context state
   *                exists in the cart after refreshing the page
   *
   * @return        void
   */
  checkProductOfProductsInCartAfterPageRefresh = () => {
    // Deep copy the state products
    const products = this.deepCopiedProducts(this.state.products);
    // Look for the items in the cart
    cart.forEach(item => {
      const index = products.findIndex(product => product.id === item.id);
      products[index].inCart = true;
    });
    // Now update the state products in this component
    this.setState(() => ({ products: products }));
    // Sums up the cart total price even after refreshing the page
    this.addTotals();
  };

  /**
   * @description   Deeply copy the products array passed as arg
   *
   * @param         array (list of products)
   * @return        copied state products
   */
  deepCopiedProducts = productsArray => {
    // Deep copy the state products
    let tempProducts = [];
    // Deep copying the state
    productsArray.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    // Return the copy of state products
    return tempProducts;
  };

  /**
   * @description   Gets a single product by id and returns copy of it
   *
   * @return        product
   */
  getItem = id => ({
    ...this.state.products.find(product => product.id === id)
  });

  /**
   * @description   Gets a single product by id and updates the state
   *
   * @param         id
   * @return        void
   */
  handleDetail = id =>
    this.setState(() => ({ detailProduct: this.getItem(id) }));

  /**
   * @description   Adds an item to the cart and store it to localstorage
   *
   * @return        void
   */
  addToCart = id => {
    const { tempProducts, product } = this.updateTheProductById(id);

    // update the state
    this.setState(
      prevState => ({
        products: [...tempProducts],
        cart: [...prevState.cart, product]
      }),
      () => this.storeCartToLocalStorageAndCountTotalPrice()
    );
  };

  /**
   * @description   handles the functionality to store cart to localstorage
   *                and call addTotal to sum up total price
   *
   * @return        void
   */
  storeCartToLocalStorageAndCountTotalPrice = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    this.addTotals();
  };

  /**
   * @description   Get a copy of products context state and then
   *                from that list get a product based on the id and then
   *                change the inCart property value as it was added to the cart
   *
   * @param         id
   * @return        copied products and the product
   */
  updateTheProductById = id => {
    // Deep copy the state products
    let tempProducts = this.deepCopiedProducts(this.state.products);
    // Get the product index
    const index = tempProducts.findIndex(product => product.id === id);
    // Get the product
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    return { tempProducts, product };
  };

  /**
   * @description   opens product modal to show
   *                product details
   *
   * @return        void
   */
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => ({ modalProduct: product, modalOpen: true }));
  };

  /**
   * @description   closes product modal
   *
   * @return        void
   */
  closeModal = () => this.setState(() => ({ modalOpen: false }));

  // Increases item quantity in the cart
  increment = id => this.handleIncrementDecrement(id);

  // decreases item quantity in the cart
  decrement = id => this.handleIncrementDecrement(id, "-");

  /**
   * @description   increases item by default but
   *                a second arg can be passed to
   *                decrease item from the cart
   *                and update the state of this component
   *
   * @param         id, operator(optional)
   * @return        void
   */
  handleIncrementDecrement = (id, operator = "") => {
    const copiedCart = this.deepCopiedProducts(this.state.cart);
    const product = copiedCart.find(item => item.id === id);
    switch (operator) {
      case "-":
        product.count = product.count !== 0 ? product.count - 1 : product.count;
        if (product.count === 0) {
          return this.removeItem(id);
        }
        break;

      default:
        product.count = product.count + 1;
        break;
    }
    product.total = product.count * product.price;

    // update the state
    this.setState(
      () => ({
        cart: [...copiedCart]
      }),
      () => this.storeCartToLocalStorageAndCountTotalPrice()
    );
  };

  // removes item from cart
  removeItem = id => {
    const tempProducts = this.deepCopiedProducts(this.state.products);
    const filteredCart = this.state.cart.filter(item => item.id !== id);
    const product = tempProducts.find(item => item.id === id);
    product.inCart = false;
    product.count = 0;
    product.total = 0;

    this.setState(
      { cart: [...filteredCart], products: [...tempProducts] },
      () => this.storeCartToLocalStorageAndCountTotalPrice()
    );
  };

  // clears the whole cart
  clearCart = () => {
    localStorage.removeItem("cart");
    this.setState({ cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };

  /**
   * @description   Sums up cart subtotal, total and tax
   *                and updates the state
   *
   * @return        void
   */
  addTotals = () => {
    const cartSubTotal = this.state.cart.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
    const tempTax = cartSubTotal * process.env.REACT_APP_TAX;
    const cartTax = parseFloat(tempTax.toFixed(2));
    const cartTotal = cartSubTotal + cartTax;
    this.setState({ cartSubTotal, cartTax, cartTotal });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { Productprovider, ProductConsumer };
