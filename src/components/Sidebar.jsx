import { useEffect, useState } from "react";
import classes from './Sidebar.module.css'
import { translaste } from "../utils/utils";
import TextOptions from './TextOptions'
import { useStoreContext } from "../store/store-context";
import { apiUrl } from "../constants/Urls";
import Loader from './Loader'
import {Link} from 'react-router-dom'
import IconWithHover from './IconWithHover'
 
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
    const {theme, toggleTheme, langTerms} = useStoreContext()
  
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

    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      if (open && ! content){
        setLoading(true)
        fetch(apiUrl + '/store/get-sidebar-content?domain=' + window.location.host).then(response=>{
          if (!response.ok){
            setLoading(false)
            return
          }
          response.json().then(data=>{
            setContent(data)
            setLoading(false)
          })
        }).catch(error=>{
          console.log(error)
          setLoading(false)
        })
      }
    }, [open])
    const {storeData} = useStoreContext()

    return (
      <div>
        {isOpen && (
          <div className={`${classes['backdrop']} ${isClosing ? classes['backdrop-fade-out'] : ''}`} onClick={onClickBackdrop}>
            <div className={`${classes['sidebar']} ${isClosing ? classes['sidebar-slide-out'] : classes['sidebar-slide-in']}`} onClick={e => e.stopPropagation()}>
              <div 
                style={{background: 'var(--primaryColor)', height: '100%',  color: 'var(--backgroundColor)'}}
                className="d-flex flex-column justify-content-between"
              >
                { storeData.mode === 'auto' && <div className="d-flex flex-wrap gap-3">
                    <h3>{ translaste('Theme') }</h3>
                    <div>
                      <TextOptions 
                        options={themeOptions}
                        selectedTextOption={themeOptions.find(elem=>elem.value === theme)}
                        setSelectedTextOption={toggleTheme}
                      />
                    </div>
                </div>}
                {
                  loading && <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'100%'}}>
                      <Loader diam={200} />
                  </div>  
                }
                <div style={{display: 'flex',  justifyContent: 'end', position: 'absolute', right: 0}}>
                  <IconWithHover onClick={onClickBackdrop} size={28} iconClass='fa-solid fa-xmark p-2' />
                </div>
                <div style={{marginTop: 42}}>
                  
                  {
                    content?.categories.map((catgory, index)=>(
                      <Link 
                        key={index} 
                        className="primary-dark-on-hover cursor-pointer p-2 d-flex align-items-center justify-content-between"
                        to={'/categories/' + catgory.slug}
                        onClick={onClickBackdrop}
                      >
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-layer-group px-2" />
                          <h3 >{translaste(catgory.name)}</h3>
                        </div>
                        
                        <i className={`fa-solid fa-chevron-${langTerms['right']} px-3`} />
                      </Link>
                    ))
                  }
                </div>
                {/* <div>
                  <div className="primary-dark-on-hover cursor-pointer p-2 d-flex align-items-center justify-content-between">
                    <h3 >{translaste('Privacy Policy')}</h3>
                    <i className="fa-solid fa-chevron-left px-3" />
                  </div>
                  <div className="primary-dark-on-hover cursor-pointer p-2 d-flex align-items-center justify-content-between">
                    <h3 >{translaste('Terms of service')}</h3>
                    <i className="fa-solid fa-chevron-left px-3" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
export default SideBar