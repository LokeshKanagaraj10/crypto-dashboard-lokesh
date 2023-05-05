import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./style.css";
import { Box , createTheme, ThemeProvider } from '@mui/material';
import Grid from '../Grid';
import List from '../List';

export default function Tabscomponent({ coins }) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette :{
        primary : {
            main: "#3a80e9"
        },
    },
  });


  const style = {
    color :"var(--white)",
    width : "50vw",
    fontSize : "1rem",
    fontWeight : 300,
    fontFamily : "Inter",
    textTransform: "capitalize",
  }
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
            <Tab label="GRID" value="grid" sx={style}/>
            <Tab label="LIST" value="list" sx={style}/>
            
          </TabList>
        </div>
        <TabPanel value="grid">
            <div className='grid-flex'>
             {
               coins.map((coin, i) => {
                return <Grid coin={coin} key={i} />
               })
            }
            </div>
        </TabPanel>
        <TabPanel value="list">
            <table className='table-list'>
                {
                coins.map((coin ,i) => {
                    return <List coin={coin}  key={i}/>
                })
            }
            </table>
        </TabPanel>
     
      </TabContext>
    </ThemeProvider>
  );
}
