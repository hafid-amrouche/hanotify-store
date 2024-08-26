import React from 'react'
import { useStoreContext } from '../../store/store-context'
import Button from '../Button'
// import SideBar from '../Sidebar'

// const ButtonWithModal=()=>{
//   const [open, setOpen] = useState(false)
//   const {colors} = useStoreContext()
//   const buttonClickHandler=()=>{
//     setOpen(state=>!state)
//   }
//   return(
//     <div>
//       <Button primary={colors['--primary-color']} secondary='#ffffff' onClick={buttonClickHandler}>
//         <i className="fa-solid fa-bars" style={{fontSize: 24}}></i>
//       </Button>
//       <SideBar open={open} onClickBackdrop={()=>setOpen(false)} />
//     </div>
    
//   )
// }

const Header = () => {
  const {storeData, colors} = useStoreContext()
  return (
    <header id='main-header' style={{
      color: 'var(--header-text-color)',
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      // justifyContent:'space-between',
      justifyContent:'center',
      backgroundColor: 'var(--primary-color)',
      position: 'sticky',
      top:0,
      zIndex:2
    }}>
     {/* <Button primary={primaryColor} secondary='#ffffff' >
        <i className="fa-solid fa-search" style={{fontSize: 20}}></i>
      </Button> */}
      <Button primary={colors['--primary-color']} secondary='#ffffff' >
        <img src={storeData.logo} height={24}  style={{borderRadius: 'var(--border-radius-1)'}}/>
      </Button>
      {/* <ButtonWithModal/> */}
    </header>
  )
}

export default Header