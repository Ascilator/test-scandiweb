import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { GET_CURRENCIES } from './query';


function App() {
  const { data, loading, error } = useQuery(GET_CURRENCIES)
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    if (!loading) {
      setCurrencies(data.currencies)
    }
  }, [data]);

  console.log(currencies);

  return (
    1324
  );
}

export default App;
