import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Container = () => {
  return (
    <>
        <Header/>
        <div style={{flexGrow: 1}}>
          <Outlet/>
        </div>
          
    </>
  )
}

export default Container