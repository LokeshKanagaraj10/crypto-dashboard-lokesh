import React, { useState , useEffect } from 'react'
import "./style.css"
import TemporaryDrawer from './drawer'
import Button from '../Buttons'
import { Link } from 'react-router-dom'
import Switch from "@mui/material/Switch";


function Header() {
  const [darkMode , setDarkMode] = useState(
    localStorage.getItem("theme") == "dark" ? true : false
  )

  useEffect(() => {
    if(localStorage.getItem("theme") == "dark"){
      setLight();
    }else{
      setDark();
    }
  }, [])

 
  function handleModechange(){
    if(localStorage.getItem("theme") != "dark"){
      setDark();
    }else{
      setLight();
    }
    setDarkMode(!darkMode)
  }
  function setLight(){
      localStorage.setItem("theme" , "light");
      document.documentElement.setAttribute("data-theme", "light");
  }

  function setDark(){
    localStorage.setItem("theme" , "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }
  
  return (
    <div className='navBar'>
        <h1 className='logo'>CryptoTracker<span className='dot'>.</span></h1>
        <div className='links'>
            <Switch checked={darkMode} onClick={() => handleModechange()}/>
            <Link to="/"><p className='link'>Home</p></Link>
            <Link to="/compare"><p className='link'>Compare</p></Link>
            <Link to="/watchlist"><p className='link'>Watchlist</p></Link>
            <Link to="/dashboard">
            <Button text={"Dashboard"} 
            outline={false}
            onClick={() => console.log("Dashboard btn is clicked")}/>
            </Link>
        </div>
        <div className='mobile-drawer'>
            <TemporaryDrawer/>
        </div>
    </div>
  )
}

export default Header