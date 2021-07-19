import React, { Component } from "react";

import classNames from "classnames";
import { getPrice } from "../../utils/utils";

class CardBig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      activePic: this?.product?.gallery[0],
    };
  }

  //getting product data
  componentDidMount() {
    const { onMount } = this.props;
    const id = this.props.match.params.productId;
    const product = onMount(id);
    if (product) {
      //to this template {size: 40, color: blue}
      const attributes = product.attributes.reduce(
        (prevValue, attributeSet) => {
          prevValue[attributeSet.name] = attributeSet.items[0].id;
          return prevValue;
        },
        {}
      );

      this.setState({
        product: product,
        activePic: product.gallery[0],
        activeAttributes: attributes,
      });
    }
  }

  render() {
    const { activeCurrency, addToCart } = this.props;
    const { product, activePic, activeAttributes } = this.state;

    const gallery = product?.gallery;
    const category = product?.category;
    const name = product?.name;
    const attributes = product?.attributes;
    const prices = product?.prices;
    const desc = product?.description;

    const renderSlides = () => {
      return gallery?.map((img) => {
        return (
          <div
            key={img}
            className="img"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                activePic: img,
              }))
            }
          >
            <img src={img} alt="" />
          </div>
        );
      });
    };

    //render all attributes size ....etc
    const renderAllAttributes = () => {
      return attributes?.map((attributeSet) => {
        return (
          <div key={attributeSet.id} className="attribute_set_container">
            <h3 className="attr_title">{attributeSet.name}</h3>
            <div className="controls">
              {attributeSet.items.map((item) => {
                return (
                  <button
                    className={classNames({
                      attribute_item: true,
                      _active: activeAttributes[attributeSet.name] === item.id,
                      _swatch: attributeSet.type === "swatch",
                    })}
                    style={
                      attributeSet.type === "swatch"
                        ? { backgroundColor: item.displayValue }
                        : {}
                    }
                    key={item.value}
                    onClick={() => {
                      this.setState((state) => ({
                        ...state,
                        activeAttributes: {
                          ...state.activeAttributes,
                          [attributeSet.name]: item.id,
                        },
                      }));
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
    return product ? (
      <div className="big_card">
        <div className="main_wrapper">
          <div className="img_slider">
            <div className="left_part">{renderSlides()}</div>
            <div className="right_part">
              <img src={activePic} alt="" />
            </div>
          </div>
          <div className="text_part">
            <div className="category">{category}</div>
            <div className="name">{name}</div>
            <div className="attribute_container">{renderAllAttributes()}</div>
            <div className="price_container">
              <h3 className="price_title">PRICE:</h3>
              <div className="price">{getPrice(activeCurrency, prices)}</div>
            </div>
            <button
              className="add_to_cart_btn"
              onClick={() => {
                addToCart(product);
              }}
            >
              ADD TO CART
            </button>
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default CardBig;
