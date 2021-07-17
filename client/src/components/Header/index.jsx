import React, { Component } from "react";

import Filter from "../Filter";
import Logo from "../Logo";
import CurrencyList from "../CurrencyList";

class Header extends Component {
  render() {
    const {
      optionList,
      forWhom,
      onForWhomChange,
      currencyList,
      activeCurrency,
      onCurrencyChange,
    } = this.props;

    return (
      <header className="header">
        <Filter
          optionList={optionList}
          forWhom={forWhom}
          onChange={onForWhomChange}
        />
        <Logo />
        <div>
          <CurrencyList
            currencyList={currencyList}
            activeCurrency={activeCurrency}
            onChange={onCurrencyChange}
          />
        </div>
      </header>
    );
  }
}

export default Header;
