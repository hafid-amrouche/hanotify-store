import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Loading from '../Loading'

const Container = () => {
  return (
    <>
        <Loading  id='loading__div' style={{display: 'none', position: 'fixed', width: '100%'}}/>
        <Header/>
        <div style={{flexGrow: 1}}>
          <Outlet/>
        </div>
          
    </>
  )
}

export default Container