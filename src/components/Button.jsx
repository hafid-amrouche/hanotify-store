import React, { useState } from 'react'
import classes from './Button.module.css'
import { darkenHexColor } from '../utils/utils'

const Button = ({children, primary, secondary, outline=false, style, ...props}) => {
  const [isHovering, setIsHovering] = useState(false)
  secondary = secondary || 'var(--background-color)'
  let btnStyle
  if (outline){
    btnStyle ={
      color: !isHovering ? secondary :  primary,
      backgroundColor:  isHovering ? secondary :  primary,
      border: `${primary} 1 solid`
    }
  }else{
    btnStyle ={
      backgroundColor: isHovering ? darkenHexColor(primary, 20) : primary,
      color: secondary
    }
  }

  return (
    <button 
      className={classes.btn}  
      onMouseEnter={()=>setIsHovering(true)} 
      onMouseLeave={()=>setIsHovering(false)} 
      style={{
        ...btnStyle,
        ...style
      }}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button