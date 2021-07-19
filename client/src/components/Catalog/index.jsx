import React, { Component } from "react";
import ProductCard from "../ProductCard";

class Catalog extends Component {
  render() {
    const { catalog, activeCurrency, addToCart } = this.props;
    const renderProducts = () => {
      return catalog.map((product) => {
        return (
          <ProductCard
            product={product}
            activeCurrency={activeCurrency}
            key={product.id}
            addToCart={addToCart}
          />
        );
      });
    };

    return catalog ? (
      <div className="catalog main_wrapper">
        <h2 className="page_title">Category name</h2>
        <div className="catalog_container">{renderProducts()}</div>
      </div>
    ) : null;
  }
}

export default Catalog;
