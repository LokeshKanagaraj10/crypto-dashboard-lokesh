import {useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css"

export default function TogglePriceType({priceType , handlePriceType}) {



  return (
    <div className='toggle-button'>
    <ToggleButtonGroup
      value={priceType}
      exclusive
      onChange={handlePriceType}
      sx={{
        "& .Mui-selected":{
            color : "var(--blue) !important",
        },
        borderColor : "var(--blue)",
        border : "unset !important",
        "& .MuiToggleButtonGroup-grouped":{
            border: "1px solid !important",
            borderColor : "unset",
            color : "var(--blue)",
        },
        "& .MuiToggleButton-standard" :{
            color : "var(--blue)",
        },  
      }}
    
    >
      <ToggleButton value="prices" >Prices</ToggleButton>
      <ToggleButton value="market_caps">Market Cap</ToggleButton>
      <ToggleButton value="total_volumes" >Total Volume </ToggleButton>
      
    </ToggleButtonGroup>
    </div>
  );
}