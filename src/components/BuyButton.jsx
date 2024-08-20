import React from 'react'
import classes from './BuyButton.module.css'
const BuyButton = ({children, className, onClick, disabled, outline, ...props}) => {
  return (
    <div className={`${outline ? classes['outline'] : ''} ${classes.button} ${className} ${ disabled ? classes.disabled : ''}`} {...props} onClick={disabled ? undefined : onClick} >{children}</div>
  )
}

export default BuyButton