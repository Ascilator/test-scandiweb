//getting price that we need
export const getPrice = (activeCurrency, prices) => {
  return `${activeCurrency.icon} ${
    prices.filter((price) => {
      return activeCurrency.curr === price.currency;
    })[0].amount
  }`;
};
