import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import Tabscomponent from '../components/Dashboard/Tabscomponent'
import axios from 'axios';
import Search from '../components/Dashboard/Seacrh'
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashboradPage() {
  const [coins , setCoins] = useState([]);
  const [paginatedCoins ,setpaginatedCoins ] = useState([])
  const[search , setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoader , setLoader] = useState(true);



  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = ((value -1) * 10);
    setpaginatedCoins(coins.slice(previousIndex , previousIndex + 10))
  };
  

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  var filteredCoins = coins.filter((item) => item.name.toLowerCase().includes(search) || item.symbol.toLowerCase().includes(search));

  useEffect(() => {
    getdata();
  },[])
   

  const getdata = async() => {
    const myCoins = await get100Coins();
    if(myCoins){
      setCoins(myCoins)
      setpaginatedCoins(myCoins.slice(0,10))
      setLoader(false);
    }
    
  }
  
  return (
    <>
    <Header />
    <BackToTop/>
    { isLoader ? <Loader/> :
      <div>
          <Search search={search} onSearchChange={onSearchChange}/>
          <Tabscomponent coins={search ? filteredCoins : paginatedCoins}/>
            {
              !search  && (
              <PaginationComponent page={page} handlePageChange={handlePageChange}/>
              )
            } 
        </div>
}
    </>
  )
}

export default DashboradPage