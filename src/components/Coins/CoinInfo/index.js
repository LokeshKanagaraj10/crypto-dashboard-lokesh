import React, { useState } from 'react'
import "./style.css"

function CoinInfo({ heading , desc }) {

    const shortDesc = desc.slice(0,350) + "<p style='color :var(--grey)'> Read More...</p>";
    const longDesc = desc + "<p style='color :var(--grey)'> Read Less...</p>";
    const [flag , setFlag] = useState(false);

  return (
    <div className='grey-wrapper'>
        <h2 className='coin-heading'>{heading}</h2>
        {
            desc.length >350 ?  <p
                         onClick={() => setFlag(!flag)}
                         className='coin-desc' 
                        dangerouslySetInnerHTML={{__html : !flag ? shortDesc : longDesc}}>
                        </p> : <p className='coin-desc' 
                        dangerouslySetInnerHTML={{__html : longDesc}}></p>
        }
       
    </div>
  )
}

export default CoinInfo