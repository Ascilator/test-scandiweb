import React, { Component } from "react";

import Filter from "../Filter";
import Logo from "../Logo";
import CurrencyList from "../CurrencyList";
import HeaderCart from "../HeaderCart";

class Header extends Component {
  render() {
    const {
      optionList,
      forWhom,
      onForWhomChange,
      currencyList,
      activeCurrency,
      onCurrencyChange,
      cartInside,
      toggleBlackBack,
      changeActiveAttributes,
      changeAmount,
    } = this.props;
    return (
      <header className="header">
        <div className="main_wrapper">
          <Filter
            optionList={optionList}
            forWhom={forWhom}
            onChange={onForWhomChange}
          />
          <Logo />
          <div className="controls_container">
            <CurrencyList
              currencyList={currencyList}
              activeCurrency={activeCurrency}
              onChange={onCurrencyChange}
            />
            <HeaderCart
              cartInside={cartInside}
              activeCurrency={activeCurrency}
              toggleBlackBack={toggleBlackBack}
              changeActiveAttributes={changeActiveAttributes}
              changeAmount={changeAmount}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
