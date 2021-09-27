import React, { useEffect, useState } from "react";
import mainLogo from './logo.png';
import './App.css';
import SearchBar from './components/searchBar';
import { Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  // TODO : finish other API endpoints 
  // const [binance, setBinance] = useState([]);
  // const [bitfinex , setBitfinex] = useState([]);

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  
  const filterResults = (items, query) => {
    if (!query) {
        return items;
    }
    else {
      return items.filter((currency) => {
          const postName = currency.symbol;
          return postName.includes(query.toUpperCase());
      });
    }
};

const searchResults = filterResults(items, query);

const sortByPrice = () => {
  setIsSorted(true);
};
 
  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
    <div className="App">
      <header className="App-header">
        <img src={mainLogo} className="App-logo" alt="logo" />
        <SearchBar />
        <div>Loading prices...</div>
      </header>
    </div>
    );
  } else if (!searchResults.length) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={mainLogo} className="App-logo" alt="logo" />
          <SearchBar />
          <div>No results found !</div>
        </header>
      </div>
    );
  } else {
    return (
    <div className="App">
      <header className="App-header">
        <img src={mainLogo} className="App-logo" alt="logo" />
        <SearchBar />
        <h2>Binance:</h2>
        <Button  onClick={sortByPrice}> 
          Sort By Price
        </Button>
        { !isSorted ?
          searchResults.map(currency => (
          <Card className="card mb-3"
            key={currency.symbol} style={{ width: '18rem', borderWidth:2, borderColor: '#fffff' }}>
            <Card.Body >
              <Card.Title className="text-info">
                1 {currency.symbol.substring(0,3)} = 
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {currency.price}
                <Card.Text  className="text-warning">
                  {currency.symbol.substring(3)}
                </Card.Text>
              </Card.Subtitle>
              <Button variant="primary">View details</Button>
            </Card.Body>
          </Card> 
          ))
          : 
          searchResults.sort((a, b) => a.price > b.price ? -1 : 1)
            .map(currency => (
            <Card className="card mb-3" 
              key={currency.symbol} style={{ width: '18rem', borderWidth:2, borderColor: '#fffff' }}>
              <Card.Body>
                <Card.Title className="text-info">
                  1 {currency.symbol.substring(0,3)} = 
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {currency.price}
                  <Card.Text  className="text-warning">
                    {currency.symbol.substring(3)}
                  </Card.Text>
                </Card.Subtitle>
                <Button variant="primary">View details</Button>
              </Card.Body>
            </Card> 
            )) 
          }
      </header>
    </div>
    );
  }
}

export default App;
