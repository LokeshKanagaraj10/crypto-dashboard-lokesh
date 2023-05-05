import React from 'react'
import "./style.css"
import Button from '../../Common/Buttons'
import iphone from '../../../assests/iphone.png'
import gradient from '../../../assests/gradient.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { toast } from 'react-toastify'

function Maincomponent() {
  return (
    <div className='main-flex'>
        <div className='left-flex'>
            <motion.h1 className='left-heading1'
            initial={{opacity:0, y:50 }}
            animate={{opacity:1, y:0}}
            transition={{duration: 0.5}}
            >Track Crypto</motion.h1>

            <motion.h1 className='left-heading2'
             initial={{opacity:0 , y:50 }}
             animate={{opacity:1, y:0 }}
             transition={{duration: 0.5, delay: 0.5}}
            >Real Time.</motion.h1>

            <motion.p className='left-para'
            initial={{opacity:0 , x:50 }}
            animate={{opacity:1, x:0 }}
            transition={{duration: 0.5, delay: 1}}
            >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>

            <motion.div className='btn-flex' 
            initial={{opacity:0 , x:-50 }}
            animate={{opacity:1, x:0 }}
            transition={{duration: 0.5, delay: 1}}>
                <div>
                 <Link to="/dashboard">
                <Button text={"Dashboard"} 
                outline={false}
                onClick={() => console.log("Dashboard btn is clicked")}/>
                </Link>
                </div>
                <div>
                    <RWebShare
                    data={{
                        text : "CryptoTracker Developed by Lokesh Kanagaraj using react JS",
                        url : "http://crypto-dashboard-lokesh.netlify.app",
                        title : "CryptoTracker.",
                    }}
                    onClick={() => toast.info("App Shared!")}                    >
                        <Button text={"Share"} outline={true}/>
                    </RWebShare>
                </div>
            </motion.div>
        </div>
        <div className='right-flex'>
            <motion.img className='iphone' src={iphone}
            initial={{y: -20 }}
            animate={{y: 20}}
            transition={{
                type:"smooth",
                repeatType:"mirror",
                duration:2,
                repeat:Infinity,
            }}/>
            <img className='gradient' src={gradient}/>
        </div>
    </div>
  )
}

export default Maincomponent