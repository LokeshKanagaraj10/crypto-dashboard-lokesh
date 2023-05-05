import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header'
import { useParams } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import axios from 'axios';
import List from '../components/Dashboard/List';
import { coinObject } from '../functions/coinObject';
import CoinInfo from '../components/Coins/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrice } from '../functions/getCoinPrices';
import LineChart from '../components/Coins/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/Coins/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../components/Coins/PriceType';


function CoinPage() {
  const { id } = useParams();
  const [isLoading , setLoader] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days , setDays] = useState(30);
  const [chartData , setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');



  useEffect(() => {
    if(id){
      getDate();
  }
}
, [id]) 
  
async function getDate(){
  const data = await getCoinData(id);
  if(data){
    setLoader(true)
    coinObject(setCoinData, data);
    const prices = await getCoinPrice(id, days, priceType)
    if(prices.length > 0){
      console.log("price >>>", prices)
      settingChartData(setChartData, prices)
      setLoader(false)
    }
   
    
  }
}

const handleDaysChange = async(event) =>{
  setDays(event.target.value);
  const prices = await getCoinPrice(id, event.target.value, priceType)
  if(prices.length > 0){
    console.log("price >>>", prices)
    settingChartData(setChartData, prices)
    setLoader(false)
  }
 
  
}

const handlePriceType = async (event, newType) => {
  setPriceType(newType)
  const prices = await getCoinPrice(id, days, newType)
  if(prices.length > 0){
    settingChartData(setChartData, prices)
    setLoader(false)
  }

};


  return (
    <div>
        <Header/>
        {
          isLoading ? <Loader/> :
          <>
          <div className='grey-wrapper'>
               <List coin={coinData} />
          </div>
          <div className='grey-wrapper'>
          <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={false}/>
          <TogglePriceType priceType={priceType} handlePriceType={handlePriceType}/>
          <LineChart chartData={chartData} priceType={priceType}/>
          </div>
           <CoinInfo heading={coinData.name} desc={coinData.desc}/>
           </>
        }
    </div>
  )
}

export default CoinPage