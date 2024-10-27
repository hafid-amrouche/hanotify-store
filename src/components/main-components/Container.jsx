import React, { useEffect, useMemo } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Loading from '../Loading'
import LazyLoadCustiom from '../LazyLoadCustiom'
import { useStoreContext } from '../../store/store-context'

const PathChangeListner = ()=>{
  const location = useLocation()
  useEffect(()=>{
    window.scrollTo(0, 0);
    document.querySelector('#meta-url').setAttribute('content', window.location.href) 
  }, [location])
}
const Container = () => {
  const {storeData} = useStoreContext()
  useMemo(() => {
    // Dynamically import CSS based on the theme
    const loadRichTextCss = async () => {
      if (storeData.footer) {
        await import('../../css/suneditor-contents.css');
      }
    };

    loadRichTextCss();
  }, [storeData]);

  return (
    <>
        <Loading  id='loading__div' style={{display: 'none', position: 'fixed', width: '100%'}}/>
        <PathChangeListner />
        <Header/>
        <div style={{flexGrow: 1, minHeight: '100vh', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
            <Outlet/>
        </div>
        {storeData.footer  && 
          <div>
            <hr className='mt-3'/>
            <LazyLoadCustiom className='p-1 sun-editor-editable' style={{marginTop: 12}} dangerouslySetInnerHTML={{ __html: storeData.footer }} />
          </div>
        }
          
    </>
  )
}

export default Container