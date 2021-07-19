import { useEffect, useState } from "react";
import classNames from "classnames";
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

  //catalog was possible to put into redux, but the aplication is not so hard, that's why i decided not to do it. But i understand that it is wrong.

  //catalog block
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState([]);

  const currIcons = ["$", "£", "A$", "¥", "₽"];
  const onCurrencyChange = (newOption) => {
    setActiveCurrency(newOption);
  };

  //for whom block
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

  //cart block
  const [cartInside, setCartInside] = useState([]);
  const addToCart = (product) => {
    let isAlreadyThere = false;
    let newCartInside = cartInside.map((productIn) => {
      if (productIn.id === product.id) {
        productIn.amount++;
        isAlreadyThere = true;
      }
      return productIn;
    });
    if (!isAlreadyThere) {
      newCartInside = [
        ...newCartInside,
        {
          ...product,
          amount: 1,
          activeAttributes: product.attributes.reduce(
            (prevValue, attributeSet) => {
              prevValue[attributeSet.name] = attributeSet.items[0].id;
              return prevValue;
            },
            {}
          ),
        },
      ];
    }
    setCartInside(newCartInside);
  };
  const changeActiveAttributes = (productId, newAttribute, newValue) => {
    setCartInside(
      cartInside.map((product) => {
        if (product.id === productId) {
          product.activeAttributes[newAttribute] = newValue;
        }
        return product;
      })
    );
  };
  const changeAmount = (productId, operation) => {
    setCartInside(
      cartInside
        .map((product) => {
          if (productId === product.id) {
            if (operation === "plus") {
              product.amount++;
            }
            if (operation === "minus") {
              product.amount--;
            }
          }
          return product;
        })
        .filter((product) => {
          return product.amount !== 0;
        })
    );
  };

  //back black
  const [active, setgActive] = useState(false);
  const toggleBlackBack = (open) => {
    setgActive(open);
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
        cartInside={cartInside}
        toggleBlackBack={toggleBlackBack}
        changeActiveAttributes={changeActiveAttributes}
        changeAmount={changeAmount}
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
              addToCart={addToCart}
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
              addToCart={addToCart}
            />
          )}
        />
        <Route
          history={history}
          path={PATH_CART}
          component={({ ...props }) => (
            <Cart
              {...props}
              cartInside={cartInside}
              activeCurrency={activeCurrency}
              changeActiveAttributes={changeActiveAttributes}
              changeAmount={changeAmount}
            />
          )}
        />
        <Redirect from={PATH_START} to={PATH_HOME} />
      </Switch>

      <div
        className={classNames({
          black_href: true,
          _active: active,
        })}
      ></div>
    </>
  );
}

export default withRouter(App);
