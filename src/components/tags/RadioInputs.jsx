import React from 'react'
import classes from './RadioInputs.module.css'

const RadioInputs = ({className, name, options, selectedRadioOption, setSelectedRadioOption, ...props}) => {
  console.log(selectedRadioOption)
  const clickHandler =(option)=>{
    setSelectedRadioOption(option)
  }
  return (
    <div>
      {
        options.map(option=>(
          <div className='d-flex align-items-center gap-2' key={option.id}>
            <input 
              className={`${className || ''} ${classes.radio}`} 
              {...props} 
              type='radio' 
              name={name} 
              id={name+option.id} 
              checked={selectedRadioOption.id === option.id}  
              onChange={()=>clickHandler(option)}
            />
            <label htmlFor={name+option.id}  >{option.label}</label>
          </div>
        ))
        }
    </div>
  )
}

export default RadioInputs