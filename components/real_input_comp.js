import TextField from "@mui/material/TextField";
import styles from './components.module.css'
import Button from '@mui/material/Button';
import { useRef, useState, useEffect } from "react";
import { animate, motion, useAnimate, useForceUpdate } from "framer-motion"
const RealSearchBar = ({handleClick,searchQuery,setSearchQuery,btnDisabled, setBtnDisabled}) => {
  const [scope, animate] = useAnimate()
  const stars_num = 15
  const stars = Array.from({length: stars_num});    
  const randomNumber = (max , min ) => {
    return Math.floor(Math. random() * (max - min + 1) + min)
  }

  const stars_opacity = stars.map((_, index)=> [
    `.sparkle-${index}`,
    {
      opacity : 0,

    }, 
    {
      at: "<"
    }
  ])
  const stars_animation = stars.map((_, index)=> [
    `.sparkle-${index}`,
    {
      x : randomNumber(-50,50),
      y : randomNumber(-30,30),
      scale : randomNumber(2,6),
      opacity : 1,

    }, 
    {
      duration : .8,
      at: "<"
    }
  ])
  
  const stars_animation_fade_out = stars.map((_, index)=> [
    `.sparkle-${index}`,
    {
      opacity : 0,
      scale : 0

    }, 
    {
      duration : .8,
      at: "<"
    }
  ])

  const stars_animation_reset  = stars.map((_, index)=> [
    `.sparkle-${index}`,
    {
      x : 0,
      y : 0

    }, 
    {
      duration : .000001,
    }
  ])

  useEffect(() => {
    // Update the document title using the browser API
    animate([...stars_animation_reset, ...stars_animation, ...stars_animation_fade_out])
    //animate([...stars_opacity])
    // animate(scope.current, 
    //   {
    //       scale: 0.7,
          
    //   },

    //   {
    //       duration: 0.1,
    //       onComplete() {
    //       animate(scope.current, { scale : 1}, { duration: 0.1 }, );
    //       },
    //   })
  }, []);
  
  const animateStars = () => {
    if (!btnDisabled){
      animate(scope.current, 
        {
            scale: 0.8,
            
        },

        {
            duration: 0.1,
            onComplete() {
            animate(scope.current, { scale : 1}, { duration: 0.1 }, );
            },
        })
    
      animate([...stars_animation_reset, ...stars_animation, ...stars_animation_fade_out])
    }
  }

  const animatebounce = () => {
    animate(scope.current, 
      {
          scale: 0.8,
          
      },

      {
          duration: 0.1,
          onComplete() {
          animate(scope.current, { scale : 1}, { duration: 0.1 }, );
          },
      })


  
  }
  
  // const handleOnSubmit = () => {
  //   // write your function here
  //   if (!btnDisabled){
  //     handleClick()
  //     setSearchQuery("")
  //     document.getElementById("search").value = "";
  //     setBtnDisabled(true)
  //   }
  
  // }
  const subButton = useRef(null);
  return (
  // onInput={(e) => {
  //   setSearchQuery(e.target.value);
  // }}
  // onChange={(text) => setBtnDisabled(!text.target.value)}
  
    
    <form style={{zIndex : 100}} className={styles.querybar}

    >
      <textarea id = "search" className={styles.textBar}
            role="textbox" 
            
            onKeyUp={(text) => {
              console.log("text.key: ",text.key)
              if(text.key === 'Enter'){
                text.preventDefault()
                subButton.current?.click()
              }else{
                setBtnDisabled(!text.target.value)
                
              }
              setSearchQuery(text.target.value);
              
            }}

            placeholder="Ask Mendy anything! What's on your mind?"
            
            >
            
      </textarea>
        <motion.div
        ref={scope}
        onTap={animateStars}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={ { opacity: 1, scale: 1}}
        transition={{
          duration: 2.2,
          ease: [0, 1, 0.3, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 80,
            restDelta: 0.001
          }
        }}
        >
          <Button  ref={subButton} className = {styles.textButton} onTap variant="contained" disabled={btnDisabled} onClick={() => {
                if (!btnDisabled){
                  handleClick()
                  setSearchQuery("")
                  document.getElementById("search").value = "";
                  setBtnDisabled(true)
                }
                
              }
            }
            
            
            
            >
              &nbsp;Ask
              <span 
                // className='absolute inset-0 opacity-0 -z-100 pointer-events-none'
              >
                {Array.from({length: stars_num}).map((_,index) => (
                  <svg  key= {index} viewBox="0 0 122 117" width="5" height="5" className={`sparkle-${index}`}>
                      <path
                        
                        fill=	"#A7C7E7"
                        d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,
                        116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
                      />
                  </svg>
                  ))}
                
              </span>
              
            </Button> 
          </motion.div>

      
    </form>
)};

export default RealSearchBar;