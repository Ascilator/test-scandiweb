import React, { Component } from "react";
import classNames from "classnames";

import { getPrice } from "../../utils/utils";

import cartIcon from "./cart_icon.svg";

class ProductCard extends Component {
  render() {
    const { product, activeCurrency } = this.props;
    const { gallery, name, prices } = product;

    return (
      <a
        href={product.inStock ? `/catalog/products/${product.id}` : "#"}
        className={classNames({
          product_card_small: true,
          _out_of_stock: !product.inStock,
        })}
      >
        <div className="img">
          <img src={gallery[0]} className="illustation" alt="" />
          <div
            className="add_to_card_in_item"
            onClick={(e) => {
              e.preventDefault();
              console.log(1234);
            }}
          >
            <img src={cartIcon} alt="" />
          </div>

          {!product.inStock && <div className="out_of_stock">OUT OF STOCK</div>}
        </div>
        <div className="item_name">{name}</div>
        <div className="item_price">{getPrice(activeCurrency, prices)}</div>
      </a>
    );
  }
}

export default ProductCard;
