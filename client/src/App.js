import { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_CURRENCIES, GET_CATALOG } from "./query";

import { PATH_HOME, PATH_ITEM, PATH_START, PATH_CART } from "./constants";

import Header from "./components/Header";
import Catalog from "./components/Catalog";
import CardBig from "./components/CardBig";
import Cart from "./components/Cart";

import "./styles.css";

function App({ history }) {
  const currenciesResponse = useQuery(GET_CURRENCIES);
  const catalogResponse = useQuery(GET_CATALOG);

  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState([]);

  const currIcons = ["$", "£", "A$", "¥", "₽"];
  const onCurrencyChange = (newOption) => {
    setActiveCurrency(newOption);
  };

  const forWhomList = ["All", "clothes", "tech"];
  const [forWhom, setForWhom] = useState(forWhomList[0]);
  const onForWhomChange = (newOption) => {
    setForWhom(newOption);
    if (newOption !== "All") {
      setFilteredCatalog(
        catalog.filter((product) => {
          return newOption === product.category;
        })
      );
    } else {
      setFilteredCatalog(catalog);
    }
  };

  //getting data from graphql server
  useEffect(() => {
    const { data, loading, error } = currenciesResponse;
    if (!loading) {
      const newCurrencies = data.currencies.map((curr, index) => {
        return {
          curr: curr,
          icon: currIcons[index],
        };
      });
      setCurrencies(newCurrencies);
      if (!activeCurrency.length) {
        setActiveCurrency(newCurrencies[0]);
      }
    }

    if (error) {
      console.log(error);
    }
  }, [currenciesResponse]);
  useEffect(() => {
    const { data, loading, error } = catalogResponse;
    if (!loading) {
      setCatalog(data.category.products);
      setFilteredCatalog(data.category.products);
    }
    if (error) {
      console.log(error);
    }
  }, [catalogResponse]);

  //getting product by id
  const filterCatalog = (id) => {
    return catalog.filter((product) => {
      return product.id === id;
    })[0];
  };

  return (
    <>
      <Header
        optionList={forWhomList}
        forWhom={forWhom}
        onForWhomChange={onForWhomChange}
        currencyList={currencies}
        activeCurrency={activeCurrency}
        onCurrencyChange={onCurrencyChange}
      />
      <Switch>
        <Route
          history={history}
          exact
          path={PATH_HOME}
          component={() => (
            <Catalog
              catalog={filteredCatalog}
              activeCurrency={activeCurrency}
            />
          )}
        />
        <Route
          history={history}
          path={PATH_ITEM}
          component={({ ...props }) => (
            <CardBig
              activeCurrency={activeCurrency}
              {...props}
              onMount={filterCatalog}
            />
          )}
        />
        <Route
          history={history}
          path={PATH_CART}
          component={({ ...props }) => <Cart {...props} />}
        />
        <Redirect from={PATH_START} to={PATH_HOME} />
      </Switch>
    </>
  );
}

export default withRouter(App);
