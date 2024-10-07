import { useState } from "react"
import { useStoreContext } from "../../store/store-context"
import IconWithHover from "../IconWithHover"
import SideBar from "../Sidebar"

const ButtonWithSideBar=()=>{
    const [open, setOpen] = useState(false)
    const buttonClickHandler=()=>{
      setOpen(state=>!state)
    }
    const {storeData} = useStoreContext()
    return(
      <div className='d-flex'>
        <IconWithHover onClick={buttonClickHandler} iconClass='fa-solid fa-bars' size={22} color={storeData.headerOutlined ? 'var(--primaryColor)' : 'var(--backgroundColor)'} />
        <SideBar open={open} onClickBackdrop={()=>setOpen(false)} />
      </div>
      
    )
  }

  export default ButtonWithSideBar