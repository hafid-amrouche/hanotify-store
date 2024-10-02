import React, { useState } from 'react'
import { useStoreContext } from '../../store/store-context'
import IconWithHover from '../IconWithHover'
import SideBar from '../Sidebar'

const ButtonWithModal=()=>{
  const [open, setOpen] = useState(false)
  const buttonClickHandler=()=>{
    setOpen(state=>!state)
  }
  const {storeData} = useStoreContext()
  return(
    <div>
      <IconWithHover onClick={buttonClickHandler} iconClass='fa-solid fa-bars' size={28} color={storeData.headerOutlined ? 'var(--primary-color)' : 'var(--background-color)'} />
      <SideBar open={open} onClickBackdrop={()=>setOpen(false)} />
    </div>
    
  )
}

const Header = () => {
  const {storeData} = useStoreContext()
  return (
    <header id='main-header' style={{
      padding: '6px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor: storeData.headerOutlined ? 'var(--background-color)' : 'var(--primary-color)',
      borderBottom: 'var(--primary-fading-color) 1px solid',
      position: 'sticky',
      top:0,
      zIndex:2
    }}>
     {/* <Button primary={primaryColor} secondary='#ffffff' >
        <i className="fa-solid fa-search" style={{fontSize: 20}}></i>
      </Button> */}
      <img className='hover-scale' src={storeData.logo} height={48}  style={{borderRadius: 'var(--border-radius-1)'}}/>
      <ButtonWithModal/>
    </header>
  )
}

export default Header