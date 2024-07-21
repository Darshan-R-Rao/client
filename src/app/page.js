'use client'
import styles from './page.module.css'
import { useRef, useEffect } from 'react';

export default function Home() {

  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    setPath(progress);
  }, [])

  const setPath = (progress) => {
    const width = window.innerWidth * 0.7;
    path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseEnter = () => {
    if(reqId){
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const pathBound =  path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress+= movementY
    setPath(progress);
  }

  const manageMouseLeave = () => {
    animateOut();
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time+=0.2;
    setPath(newProgress);
    if(Math.abs(progress) > 0.75){
      reqId = requestAnimationFrame(animateOut);
    }
    else{
      resetAnimation();
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  }

  return (
    <div className={styles.container}>
        <div className={styles.body}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className={styles.line}>
              <div onMouseEnter={() => {manageMouseEnter()}} onMouseMove={(e) => {manageMouseMove(e)}} onMouseLeave={() => {manageMouseLeave()}} className={styles.box}></div>
              <svg>
                <path ref={path}></path>
              </svg>
            </div>

            <div className={styles.description}>
            <div id="footer_logo"><a href="http://www.valvesoftware.com" target="_blank" rel=""><img src="https://store.akamai.steamstatic.com/public/images/footerLogo_valve_new.png" alt="Valve Software" border="0"></img></a></div>
              <p>© 2024 Valve Corporation. All rights reserved. 
                All trademarks are property of their respective owners in the US and other countries.
              VAT included in all prices where applicable.  
              Privacy Policy   |   Legal   |   Steam Subscriber Agreement   |   Refunds   |   Cookies</p> 
            </div>
            <div className={styles.tagsContainer}>
              <div className={styles.tags}>
                <p>About Valve</p>
                <p>Jobs</p>
                <p>SteamWorks</p>
                <p>Steam distribution</p>
                <p>Support</p>
                <p>Gift Cards</p>
                <p><script src="https://cdnjs.cloudflare.com/ajax/libs/facebook-nodejs-business-sdk/20.0.0/umd.js" integrity="sha512-C8wUxt9WuAtYX8eoDJssMhoc50Q8UbK0HtZesLQk2S6RaqRF7RzVmgtLlhoxM7ZEMc6C36Ft7sdcyBxkZCRiNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><a href="https://steamcommunity.com/linkfilter/?u=http%3A%2F%2Fwww.facebook.com%2FSteam" target="_blank" rel=" noopener"><img src="https://store.akamai.steamstatic.com/public/images/ico/ico_facebook.png" alt="Facebook"></img></a>Steam</p>
                <p><a href="http://twitter.com/steam" target="_blank" rel=""><img src="https://store.akamai.steamstatic.com/public/images/ico/ico_twitter.png" alt="X"></img></a>@steam</p>
              </div>
            </div>
            <div id="footer_logo_steam"><img src="https://store.akamai.steamstatic.com/public/images/v6/logo_steam_footer.png" alt="Valve Software" border="0"></img></div>
        </div>
    </div>
  )
}