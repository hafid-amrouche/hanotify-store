import React from 'react'
import classes from './Accordiant.module.css'

const Accordiant = ({checked, setChecked, size=18, ...props}) => {
  return (
        <i style={{ padding: '8px', cursor: 'pointer' }} className={'fa-solid fa-chevron-up ' + classes['icon'] + ' ' + ( checked ? classes['checked'] : '' ) } size={size} onClick={()=>setChecked(!checked)} {...props}/>
  )
}
export default Accordiant
