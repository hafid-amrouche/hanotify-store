import React from 'react'
import classes from './TextOptions.module.css'

const TextOptions = ({options, selectedTextOption, setSelectedTextOption}) => {
  return (
    <div className={classes.container}>
      {
        options.map(option=>(
            <p key={option.id} className={`${classes.text} ${selectedTextOption.id === option.id ? classes.selected : ''}`} onClick={()=>setSelectedTextOption(option)}>{ option.label }</p>
        )) 
      }
    </div>
      
  )
}

export default TextOptions