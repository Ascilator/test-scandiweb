import React, { Component } from "react";
import classNames from "classnames";

import { getPrice } from "../../utils/utils";

import chevron from "./chevron.svg";

class CartProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: 0,
    };
  }
  render() {
    const {
      prod,
      activeCurrency,
      changeActiveAttributes,
      changeAmount,
      isCartPage = false,
    } = this.props;
    const { attributes, activeAttributes, gallery } = prod;
    const { activeImg } = this.state;

    const renderAllAttributes = () => {
      return attributes?.map((attributeSet) => {
        return (
          <div key={attributeSet.id} className="attribute_set_container">
            <h3 className="attr_title">{attributeSet.name}</h3>
            <div className="controls">
              {attributeSet.items.map((item) => {
                return (
                  <button
                    key={item.value}
                    style={
                      attributeSet.type === "swatch"
                        ? { backgroundColor: item.displayValue }
                        : {}
                    }
                    className={classNames({
                      attribute_item: true,
                      _active: activeAttributes[attributeSet.name] === item.id,
                      _swatch: attributeSet.type === "swatch",
                    })}
                    onClick={() => {
                      changeActiveAttributes(
                        prod.id,
                        attributeSet.name,
                        item.id
                      );
                    }}
                  >
                    {item.displayValue}
                  </button>
                );
              })}
            </div>
          </div>
        );
      });
    };
    const renderSlider = () => {
      if (!isCartPage || gallery.length === 1) {
        return <img src={gallery[0]} alt="" />;
      }
      return (
        <div className="cart_slider">
          <button
            className="arrow arrowLeft"
            onClick={() => {
              this.setState((state) => ({
                activeImg: (state.activeImg - 1) % gallery.length,
              }));
            }}
          >
            <img src={chevron} alt="" />
          </button>
          <div className="slider_body">
            {gallery.map((imgItem, index) => {
              return (
                <img
                  src={imgItem}
                  className={classNames({
                    slide: true,
                    _active_slide: index === activeImg,
                  })}
                  alt=""
                />
              );
            })}
          </div>
          <button
            className="arrow arrowRight"
            onClick={() => {
              this.setState((state) => ({
                activeImg: (state.activeImg + 1) % gallery.length,
              }));
            }}
          >
            <img src={chevron} alt="" />
          </button>
        </div>
      );
    };

    return (
      <div className="product_in_cart">
        <div className="left_part">
          <div className="title">{prod.name}</div>
          <div className="price">{getPrice(activeCurrency, prod.prices)}</div>
          <div className="attributes_cont">{renderAllAttributes()}</div>
        </div>
        <div className="right_part">
          <div className="calc">
            <button
              className="plus"
              onClick={() => {
                changeAmount(prod.id, "plus");
              }}
            >
              +
            </button>
            <div className="amount">{prod.amount}</div>
            <button
              className="minus"
              onClick={() => {
                changeAmount(prod.id, "minus");
              }}
            >
              -
            </button>
          </div>
          <div className="slider">{renderSlider()}</div>
        </div>
      </div>
    );
  }
}

export default CartProductItem;
