import { useState,  useEffect } from 'react'; 
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Switch from "@mui/material/Switch";



export default function TemporaryDrawer() {
  const [open,setOpen] = useState(false)

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
    <div>
        <IconButton onClick={() => setOpen(true)}>
            <MenuRoundedIcon className='link'/>
        </IconButton>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={() => setOpen(false)}
          >
           <div className='drawer-div'>
           <Link to="/"><p className='link'>Home</p></Link>
            <Link to="/compare"><p className='link'>Compare</p></Link>
            <Link to="/watchlist"><p className='link'>Watchlist</p></Link>
            <Link to="dashboard">
            <IconButton text={"Dashboard"} 
            outline={false}
            onClick={() => console.log("Dashboard btn is clicked")}/>
            </Link>
            <Switch checked={darkMode} onClick={() => handleModechange()}/>

           </div>
          </Drawer>
    </div>
  );
}