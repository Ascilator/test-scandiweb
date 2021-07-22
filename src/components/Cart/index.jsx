import React, { Component } from 'react';
import CartProductItem from '../CartProductItem';

class Cart extends Component {
  render() {
    const { cartInside, activeCurrency, changeActiveAttributes, changeAmount } = this.props;

    const renderCartBody = () => {
      if (cartInside.length === 0) {
        return <div className="no_products">No products</div>;
      }
      return cartInside.map((product) => {
        return (
          <CartProductItem
            key={product.id}
            prod={product}
            activeCurrency={activeCurrency}
            changeActiveAttributes={changeActiveAttributes}
            changeAmount={changeAmount}
            isCartPage={true}
          />
        );
      });
    };

    return (
      <div className="main_wrapper">
        <h2 className="page_title">Cart</h2>
        <div className="cart_page_container">{renderCartBody()}</div>
      </div>
    );
  }
}

export default Cart;
