import React, { useState , useEffect } from 'react'
import Header from '../components/Common/Header'
import Tabscomponent from '../components/Dashboard/Tabscomponent';
import { get100Coins }from '../functions/get100Coins'



function Watchlist() {
    const [coins ,setCoins] = useState([])
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    useEffect(() => {
       getData();
    
    }, [])
    
    const getData = async () => {
        const allcoins = await get100Coins()
        if(allcoins){
            console.log(allcoins)
            setCoins(allcoins.filter((coin) => watchlist.includes(coin.id)));
        }
    }

  return (
    <div>
        <Header/>
        {
            coins.length > 0 ? <Tabscomponent coins={coins}/> : <h1 className='no-coin-msg'>NO COINS IN WATCHLIST</h1>
 

        }
    </div>
  )
}

export default Watchlist