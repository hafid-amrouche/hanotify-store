import React from 'react'
import classes from './RadioInputs.module.css'

const RadioInputs = ({className, name, options, selectedRadioOption, setSelectedRadioOption, ...props}) => {
  const clickHandler =(option)=>{
    setSelectedRadioOption(option)
  }
  return (
    <div className='d-flex flex-column gap-2'>
      {
        options.map(option=>(
          <div className='d-flex gap-2 flex-nowrap align-items-top'  key={option.id}>
            <input 
              className={`${className || ''} ${classes.radio}`} 
              {...props} 
              type='radio' 
              name={name} 
              id={name+option.id} 
              checked={selectedRadioOption.id === option.id}  
              onChange={()=>clickHandler(option)}
              style={{flexShrink: 0}}
            />
            <label className='lh-14' htmlFor={name+option.id}  >{option.label}</label>
          </div>
        ))
        }
    </div>
  )
}

export default RadioInputs