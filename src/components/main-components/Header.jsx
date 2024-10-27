import React, { useEffect, useState } from 'react'
import { useStoreContext } from '../../store/store-context'
import { Link } from 'react-router-dom'
import ButtonWithSideBar from './ButtonWithSideBar'


const Header = () => {
  const {storeData} = useStoreContext()

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        if(document.querySelector('#main-header')) document.querySelector('#main-header').style.top = '-52px'
      } else {
        // Scrolling up
        if(document.querySelector('#main-header')) document.querySelector('#main-header').style.top = '0'
      }

      // Update the last known scroll position
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the scroll event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]); // Dependency on lastScrollPosition
  return (
    <header id='main-header' style={{
      padding: '6px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor: storeData.headerOutlined ? 'var(--backgroundColor)' : 'var(--primaryColor)',
      borderBottom: 'rgba(var(--primaryColor-rgb), 0.8) 1px solid',
      position: 'sticky',
      top:0,
      zIndex:2,
      transition: 'top 0.3s ease-in-out',
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