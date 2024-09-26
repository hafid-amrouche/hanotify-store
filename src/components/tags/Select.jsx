import React, { useEffect, useRef, useState } from 'react'
import classes from './Select.module.css'
import ClickOutsideComponent from '../ClickOutsideComponent'
import { adjustScrollPosition } from '../../utils/utils'

const Select = ({options, setSelectedOption, selectedOption, keyExtractor, containerClassName, error, ...props}) => {
  const [dropDownshown, setDropdownShown] = useState(false)
  const clickHandler=(option)=>{
    setDropdownShown(false)
    setSelectedOption(option)
  }

  const dropDownRef = useRef()
  useEffect(()=>{
    if(dropDownshown) adjustScrollPosition(dropDownRef.current)
  }, [dropDownshown])

  return (
    <ClickOutsideComponent className={containerClassName} onClickOutside={()=>setDropdownShown(false)} listeningCondintion={dropDownshown} {...props} >
      <div className={'p-relative cursor-pointer'}>
        <div className={classes['select-container'] + (error && !dropDownshown ? ' error small-jiggle' : '')} onClick={()=>setDropdownShown(state=>!state)}>
          <h4 className='flex-1 color-primary cut-text'>{selectedOption.label}</h4>
          <i className={`fa-solid fa-chevron-${dropDownshown ? 'up' : 'down'} color-primary`} ></i>
        </div>
        {dropDownshown && (
          <div className={classes['options-box']} ref={dropDownRef} style={{zIndex: 2}}>
            <div className={classes['option-box__container']}>
              {options.map(option=>(
                  <div key={keyExtractor(option)} className={classes.option + ' cut-text'} onClick={clickHandler.bind(this, option)}>{option.label}</div>
                ))}
            </div>
          </div>
        )}
      </div>
    </ClickOutsideComponent>
      
  )
}

export default Select