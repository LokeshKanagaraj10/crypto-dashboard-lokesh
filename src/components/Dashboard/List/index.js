import React ,{ useState } from 'react'
import "./style.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import Tooltip from '@mui/material/Tooltip';
import { convertNumbers } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addCointoWatchlist } from '../../../functions/addCointoWatchlist';
import { removeCoinFromWatchlist } from '../../../functions/removeCoinFromWatchlist';


function List({ coin }) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded , setIsCoinAdded] = useState(watchlist?.includes(coin.id)); // true or false 

  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className='list-row'>  
    <Tooltip title="coin-Logo">
       <td className='td-list-image'> 
            <img src={coin.image} className="coin-image" />
        </td>
    </Tooltip>  

        <td className='td-coin-info'>
            <div className="coin-basic-details">
                <Tooltip title="Coin-Symbol"><p className="coin-symbol">{coin.symbol.toUpperCase()}</p></Tooltip>
                <Tooltip title="Coin-Name"><p className="coin-name">{coin.name}</p></Tooltip>
            </div>
        </td>
      

      {
      coin.price_change_percentage_24h > 0 ? 
      <Tooltip title="Price Change in 24h">
        <td className="chip-flex">
        <div className="price-chip">{coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        
          <div className="icon-chip td-mobile">
            <TrendingUpRoundedIcon />
          </div>
        </td>
        </Tooltip> 
       : 
        <Tooltip title="Price Change in 24h">
        <td className="chip-flex">
          <div className="price-chip chip-red">{coin.price_change_percentage_24h.toFixed(2)}%
          </div>

          <div className="icon-chip chip-red td-mobile">
            <TrendingDownRoundedIcon />
          </div>
        </td>
        </Tooltip>
      
      }
      <Tooltip title="Current Price">
       <td className='td-current-price'> 
            <h3 className="td-coin-current-price"
                style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)"}}>
                ${coin.current_price.toLocaleString()}
            </h3>
        </td>
        </Tooltip>
       <Tooltip title="Total Volume"><td className='td-total-volume td-desktop-view'><p className="total_volume"> ${coin.total_volume.toLocaleString()}</p></td></Tooltip>     
       <Tooltip title="Total Volume"><td className='td-total-volume td-mobile-view'><p className="total_volume"> ${convertNumbers(coin.total_volume)}</p></td></Tooltip>     
       <Tooltip title="Market Cap"><td className='td-market-cap td-mobile'><p className="market-cap">  ${coin.market_cap.toLocaleString()}</p></td></Tooltip>  
       <td className='td-mobile' >
       <div className={coin.price_change_percentage_24h > 0 ? "watchlist-list-green" : "watchlist-list-red" }
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

      </td>
    
    </tr>   
   </Link> 
)
    
}

export default List