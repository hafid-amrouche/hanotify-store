import React from 'react'
import { useStoreContext } from '../../store/store-context'
import { Link } from 'react-router-dom'
import ButtonWithSideBar from './ButtonWithSideBar'


const Header = () => {
  const {storeData} = useStoreContext()
  return (
    <header id='main-header' style={{
      padding: '6px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor: storeData.headerOutlined ? 'var(--backgroundColor)' : 'var(--primaryColor)',
      borderBottom: 'var(--primary-fading-color) 1px solid',
      position: 'sticky',
      top:0,
      zIndex:2
    }}>
     {/* <Button primary={primaryColor} secondary='#ffffff' >
        <i className="fa-solid fa-search" style={{fontSize: 20}}></i>
      </Button> */}
      <Link to='' className='d-flex'>
        <img className='scale-on-hover' src={storeData.logo} height={38}  style={{borderRadius: 'var(--border-radius-1)'}}/>
      </Link>
      <ButtonWithSideBar/>
    </header>
  )
}

export default Header