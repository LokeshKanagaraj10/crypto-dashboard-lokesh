import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoin'
import SelectDays from '../components/Coins/SelectDays';
import { getCoinData } from '../functions/getCoinData';
import { coinObject } from '../functions/coinObject';
import { getCoinPrice } from '../functions/getCoinPrices';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coins/CoinInfo';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coins/LineChart';
import TogglePriceType from '../components/Coins/PriceType';


function ComparePage() {
    const [crypto1 , setCrypto1] = useState("bitcoin");
    const [crypto2 , setCrypto2] = useState("ethereum");
    const [days , setDays] = useState(30);
    const [isLoader , setLoader] = useState(true)
    const [crypto1Data , setCryto1Data] = useState({});
    const [crypto2Data , setCryto2Data] = useState({});
    const [priceType , setPriceType] = useState("prices")
    const [chartData , setChartData] = useState({})

    async function handleDaysChange(event) {
        setLoader(true)
        setDays(event.target.value)
        const prices1 = await getCoinPrice(crypto1 ,event.target.value , priceType) 
        const prices2 = await getCoinPrice(crypto2 ,event.target.value , priceType)
        if(prices1.length>0 && prices2.length>0){
            settingChartData(setChartData, prices1 , prices2)
            console.log("Both prices fetched >>>" , prices1, prices2)
            setLoader(false)
        } 
    }

    useEffect(() => {
        getData()
      
    }, [])
    
    async function getData(){
        const data1 = await getCoinData(crypto1);
        const data2 = await getCoinData(crypto2);
        if(data1){
            coinObject(setCryto1Data, data1);
        }
        if(data2){
            coinObject(setCryto2Data, data2);
        }
        if(data1 && data2){
            const prices1 = await getCoinPrice(crypto1 ,days , priceType) 
            const prices2 = await getCoinPrice(crypto2 ,days , priceType)
            if(prices1.length>0 && prices2.length>0){
                settingChartData(setChartData, prices1 , prices2, crypto1, crypto2)
                console.log("Both prices fetched >>>" , prices1, prices2)
                setLoader(false)
            } 
        }
}

    const handleCoinChange = async (event , isCoin2) => {
        setLoader(true);
        if(isCoin2){
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
                coinObject(setCryto2Data, data);
                const prices1 = await getCoinPrice(crypto1, days, priceType)
                const prices2 = await getCoinPrice(crypto2 , days, priceType)
                if(prices1.length>0 && prices2.length>0){
                    settingChartData(setChartData, prices1 , prices2, crypto1, crypto2)
                    console.log("you selected these 2 coins >>>", prices1,  prices2)
                    setLoader(false)
                }
        }else{
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
                coinObject(setCryto1Data, data);
                const prices1 = await getCoinPrice(crypto1, days, priceType)
                const prices2 = await getCoinPrice(crypto2 , days, priceType)
                if(prices1.length>0 && prices2.length>0){
                    settingChartData(setChartData, prices1 , prices2, crypto1, crypto2)
                    setLoader(false)
                }
                
        }
      }

      const handlePriceType = async (event, newType) => {
        setPriceType(newType)
        const prices1 = await getCoinPrice(crypto1, days, newType)
        const prices2 = await getCoinPrice(crypto2 , days, newType)
        settingChartData(setChartData, prices1 , prices2, crypto1, crypto2)
        setLoader(false)
      };
   
    

  return (
    <div>
        <Header/>
        {
            isLoader ? (
                <Loader/>
            ) : (
                <>
                <div className='coin-flex-days'>
                <SelectCoins  crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange}/> 
                <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={true}/>
                </div>
                <div className='grey-wrapper'>
                    <List coin={crypto1Data} />
                </div>
                <div className='grey-wrapper'>
                    <List coin={crypto2Data} />
                </div>
                <div className='grey-wrapper'>
                    <TogglePriceType priceType={priceType} handlePriceType={handlePriceType}/>
                    <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
                </div>
                <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc}/>
                <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc}/>
                </>
            )
        }
       
    </div>
  )
}

export default ComparePage