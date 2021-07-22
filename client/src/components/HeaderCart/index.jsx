import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { getPrice } from "../../utils/utils";

import CartProductItem from "../CartProductItem";

import cart from "./cart.svg";
import { PATH_CART } from "../../constants";

class HeaderCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e) {
    const { toggleBlackBack } = this.props;
    if (!e.target.closest(".cart")) {
      this.setState({ open: false });
      toggleBlackBack(false);
    }
  }

  render() {
    const {
      cartInside,
      activeCurrency,
      toggleBlackBack,
      changeActiveAttributes,
      changeAmount,
    } = this.props;
    const getTotal = () => {
      return cartInside.reduce((prevValue, product) => {
        return (prevValue +=
          getPrice(activeCurrency, product.prices).slice(2) * product.amount);
      }, 0);
    };
    const renderCartInside = () => {
      return cartInside.map((prod) => {
        return (
          <CartProductItem
            prod={prod}
            activeCurrency={activeCurrency}
            key={prod.id}
            changeActiveAttributes={changeActiveAttributes}
            changeAmount={changeAmount}
          />
        );
      });
    };
    const getAmount = () => {
      return cartInside.reduce((prevValue, elem) => {
        return (prevValue += elem.amount);
      }, 0);
    };
    return (
      <div
        className={classNames({
          cart: true,
          open: this.state.open,
        })}
        ref={this.wrapperRef}
      >
        <div
          className="cart_icon"
          onClick={() => {
            this.setState((state) => ({
              open: !state.open,
            }));
            toggleBlackBack(!this.state.open);
          }}
        >
          <img src={cart} alt="" />
          {cartInside.length ? <div className="size">{getAmount()}</div> : null}
        </div>
        <div className="cart_body">
          <div className="cart_body_header">
            <span>My Bag, </span> {getAmount()} items
          </div>
          {renderCartInside()}
          <div className="cart_footer">
            <div className="total">
              <span>Total</span>
              <span>
                {activeCurrency.icon} {getTotal()}
              </span>
            </div>
            <div className="cart_btns">
              <Link
                to={PATH_CART}
                className="black_btn"
                onClick={() => {
                  this.setState((state) => ({
                    open: !state.open,
                  }));
                  toggleBlackBack(!this.state.open);
                }}
              >
                View bag
              </Link>
              <Link
                to={PATH_CART}
                onClick={() => {
                  this.setState((state) => ({
                    open: !state.open,
                  }));
                  toggleBlackBack(!this.state.open);
                }}
                className="green_btn"
              >
                CHECK OUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderCart;
