import React from "react";
import '../App.css';

function SearchBar() { 
    const handleChange = e => {
          e.currentTarget.value = e.currentTarget.value.replace(
            /[^a-zA-Z]/g, "");
      };
      return ( 
         <form action="/" method="get"  >
            <label htmlFor="header-search">
                <h2>Search current market prices!</h2>
            </label>
            <div>
                <marquee className="scrolling-text" behavior="scroll" direction="left">
                    Type a pair of interest ** e.g. `BTCUSD`, `BTCUSDT`, `ETHUSD`, etc. 
                </marquee>
            </div>
            <div>
                {/* TODO : make two input fields for the crypto pair */}
                <input
                    type="text"
                    id="header-search"
                    placeholder="currency symbol"
                    name="s"
                    onChange={handleChange}  
                />
            <button type="submit" style={{marginLeft: 10}}>Search</button>
            </div>
        </form>
      );
}

export default SearchBar;