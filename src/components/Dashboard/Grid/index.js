import React, { useState } from 'react'
import "./style.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addCointoWatchlist } from '../../../functions/addCointoWatchlist';
import { removeCoinFromWatchlist } from '../../../functions/removeCoinFromWatchlist';

function Grid({ coin , key}) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded , setIsCoinAdded] = useState(watchlist?.includes(coin.id)); // true or false 

  return (
    <Link to={`/coin/${coin.id}`}>
    <div
      className={`grid-container 
      ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>

      <div className="info-flex">
        <img src={coin.image} className="coin-image" />
        <div className="coin-basic-details">
          <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      
      <div className={coin.price_change_percentage_24h > 0 ? "watchlist-grid-green" : "watchlist-grid-red" }
      onClick={(e) => {
        e.preventDefault();
        if(isCoinAdded){
          //remove coin from watchlist
          if(window.confirm(`Do you want to remove ${coin.id} from Watchlist?`)){
          let watchlist = JSON.parse(localStorage.getItem("watchlist"))
          let newwatchlist = watchlist.filter((item)=> item!= coin.id)
          localStorage.setItem("watchlist" , JSON.stringify(newwatchlist));
          alert(`${(coin.id).charAt(0).toUpperCase()+(coin.id).slice(1)} removed from watchlist`)
          setIsCoinAdded(false);
          }
          
        }else{
          //Adding coin to watchlist
          setIsCoinAdded(true);
          let watchlist = JSON.parse(localStorage.getItem("watchlist"));
          if(watchlist){
              if(!watchlist.includes(coin.id)){
                  watchlist.push(coin.id);
                  alert(`${(coin.id).charAt(0).toUpperCase()+(coin.id).slice(1)} added to Watchlist`)
                  localStorage.setItem("watchlist" , JSON.stringify(watchlist));
                }
          }else{
            watchlist = [coin.id];
            localStorage.setItem("watchlist" , JSON.stringify(watchlist));
          }
        }
      }}> 
       { isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
      </div>

      {
      coin.price_change_percentage_24h > 0 ? 
        <div className="chip-flex">
          <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          
          <div className="icon-chip">
            <TrendingUpRoundedIcon />
          </div>
        </div>
       : 
        <div className="chip-flex">
          <div className="price-chip chip-red">{coin.price_change_percentage_24h.toFixed(2)}%
          </div>

          <div className="icon-chip chip-red">
            <TrendingDownRoundedIcon />
          </div>
        </div>
      
      }
      <div className="info-container">
        <h3 className="coin-current-price"
          style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)"}}>
          ${coin.current_price.toLocaleString()}
        </h3>
        <div className='market-details'>
            <p className="total_volume"> Total Volume : ${coin.total_volume.toLocaleString()}</p>
            <p className="market-cap"> Market Cap : ${coin.market_cap.toLocaleString()}</p>
        </div>  
      </div>
    </div>
  </Link>  
  )
}

export default Grid