import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import classes from './TextInput.module.css'

const TextInput = forwardRef(({
  className= '', 
  containerClassName = '',
  label, 
  type, 
  defaultValue='',
  onFocus=()=>{}, 
  onBlur=()=>{}, 
  onChange=()=>{},
  value=null, 
  placeholder, 
  placeholderLabel,
  style,
  error,
  ...props
  }, 
  ref
) => {
  const [innerType, setInnerType] = useState(type)
  const [labelOnTop ,setLabelOnTop] = useState(false)
  const [innerValue, setInnerValue] = useState(defaultValue)
  const changeHandler=(value)=>{
    setInnerValue(value)
    onChange(value)
  }
  const clickHandler=()=>{
    setInnerType(state=>state === 'password' ? 'text' : 'password')
  }
  const focusHandler=(e)=>{
    setLabelOnTop(true)
    onFocus(e)
  }
  const blueHandler=(e)=>{
    setLabelOnTop(false)
    const newValue = e.target.value.trim()
    onBlur(newValue)
    setInnerValue(newValue)
  }
  const inputRef = useRef()  

  // setValue from outside
  useImperativeHandle(ref, () => ({
    setValue: (newValue)=>changeHandler(newValue),
    classList: inputRef.current.classList
  }));


  const inputValue= value == null ? innerValue : value
  const raiseLabel = (labelOnTop) ||( inputValue !== '')

  return (
    <div className={containerClassName} style={{borderRadius: 'var(--border-radius-2)'}}>
      <div className='d-flex p-relative align-center ' style={{borderRadius: 'var(--border-radius-2)'}}>
        <div className='d-flex p-relative align-items-center flex-1' style={{borderRadius: 'var(--border-radius-2)'}}>
          <input value={inputValue} style={{padding: '12px 8px 4px 8px', ...style}} onChange={(e)=>changeHandler(e.target.value)} placeholder={placeholder} onFocus={focusHandler} onBlur={blueHandler} type={innerType} className={ `  ${type==='password' ? classes['password'] : ''} ${classes['input']} ${error ? 'error' : ''} ${placeholder ? classes['placeholder-exist'] : ''} ${className || ''}`} ref={inputRef} {...props} />
          { !placeholder && <label style={{width: `calc(100% - 16px)`}} onClick={()=>inputRef.current.focus() } className={`${classes['label']} ${error ? 'error ' : ''} ${ raiseLabel ? classes['label-on-top'] : ''} cut-text  ${type==='password' ? classes['password'] : ''}`}>{(raiseLabel ||  !placeholderLabel) ? label : placeholderLabel}</label>}
        </div>
        {type == 'password' && <i onClick={clickHandler} className={'fa-solid fa-eye' + (innerType === 'password' ? ' ' : '-slash ' ) + classes['eye']} />}
      </div>
      { error && <h4 className='error mt-2'>{error}</h4>}
    </div>
      

  )
})

export default TextInput