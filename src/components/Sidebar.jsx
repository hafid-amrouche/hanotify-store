import { useEffect, useState } from "react";
import classes from './Sidebar.module.css'
import { translaste } from "../utils/utils";
import TextOptions from './TextOptions'
import { useStoreContext } from "../store/store-context";

const themeOptions=[
  {
    id: 1,
    label: 
      <div className="d-flex align-items-center gap-2">
        <i className="fa-solid fa-sun" />
        <h4>{translaste('Light')}</h4>
      </div>,
    value: 'light'
    },
  {
    id: 2,
    label: 
    <div className="d-flex align-items-center gap-2">
      <i className="fa-solid fa-moon" />
      <h4>{translaste('Dark')}</h4>
    </div>,
    value: 'dark'
  }
]

const SideBar=({open, onClickBackdrop})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const {theme, toggleTheme} = useStoreContext()
  
    const openSidebar = () => {
      // document.documentElement.classList.add('no-scroll');
      setIsOpen(true);
      setIsClosing(false);
    };
  
    const closeSidebar = () => {
      // document.documentElement.classList.remove('no-scroll');
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // Match this duration with the CSS animation duration
    };
  
    useEffect(()=>{
      if(open) openSidebar()
      else closeSidebar()
    }, [open])

    return (
      <div>
        {isOpen && (
          <div className={`${classes['backdrop']} ${isClosing ? classes['backdrop-fade-out'] : ''}`} onClick={onClickBackdrop}>
            <div className={`${classes['sidebar']} ${isClosing ? classes['sidebar-slide-out'] : classes['sidebar-slide-in']}`} onClick={e => e.stopPropagation()}>
              <div className="p-2">
                { window.storeData.mode === 'auto' && <div className="d-flex flex-wrap gap-3">
                    <h3>{ translaste('Theme') }</h3>
                    <div>
                      <TextOptions 
                        options={themeOptions}
                        selectedTextOption={themeOptions.find(elem=>elem.value === theme)}
                        setSelectedTextOption={toggleTheme}
                      />
                    </div>
                </div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
export default SideBar