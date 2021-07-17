import { useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_CURRENCIES, GET_CATALOG } from "./query";

import { PATH_HOME, PATH_START } from "./constants";

import Header from "./components/Header";
import Catalog from "./components/Catalog";

import "./styles.css";

function App({ history }) {
  const currenciesResponse = useQuery(GET_CURRENCIES);
  const catalogResponse = useQuery(GET_CATALOG);

  const [catalog, setCatalog] = useState([]);

  const [currencies, setCurrencies] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState([]);
  const currIcons = ["$", "£", "A$", "¥", "₽"];
  const onCurrencyChange = (newOption) => {
    setActiveCurrency(newOption);
  };

  const forWhomList = ["Women", "Men", "Kids"];
  const [forWhom, setForWhom] = useState(forWhomList[0]);
  const onForWhomChange = (newOption) => {
    setForWhom(newOption);
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
      setActiveCurrency(newCurrencies[0]);
    }

    if (error) {
      console.log(error);
    }
  }, [currenciesResponse]);

  useEffect(() => {
    const { data, loading, error } = catalogResponse;
    if (!loading) {
      setCatalog(data);
    }
    if (error) {
      console.log(error);
    }
  }, [catalogResponse]);

  console.log(catalog);

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
        <Route history={history} exact path={PATH_HOME} component={Catalog} />
        <Redirect from={PATH_START} to={PATH_HOME} />
      </Switch>
    </>
  );
}

export default withRouter(App);
