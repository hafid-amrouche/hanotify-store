import React from 'react'
import classes from './CircleOptions.module.css'

const CircleOptions = ({options, selectedCCOption, setSelectedCCOption}) => {
  return (
    <div className={classes.container}>
      {
        options.map(option=>(
          <div className={selectedCCOption.id===option.id ? classes.selected : undefined} key={option.id}>
            <div className={`${classes.circle}`} style={{backgroundColor: option.color}} onClick={()=>setSelectedCCOption(option)}/>
          </div>
        )) 
      }
    </div>
      
  )
}

export default CircleOptions