import React from 'react'

const PhoneNumer = ({children}) => {
  return (
    <a href={'tel:' + children}><strong className='color-primary' >{children}</strong></a>
  )
}

export default PhoneNumer