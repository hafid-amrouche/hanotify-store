import React from 'react'
import classes from './TextOptions.module.css'

const TextOptions = ({options, selectedTextOption, setSelectedTextOption}) => {
  return (
    <div className={classes.container}>
      {
        options.map(option=>(
            <div key={option.id} className={`${classes.text} ${selectedTextOption.id === option.id ? classes.selected : ''}`} onClick={()=>setSelectedTextOption(option)}>{ option.label }</div>
        )) 
      }
    </div>
      
  )
}

export default TextOptions