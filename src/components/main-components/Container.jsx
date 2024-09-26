import React, { useEffect, useMemo } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Loading from '../Loading'
import LazyLoadCustiom from '../LazyLoadCustiom'
import { useStoreContext } from '../../store/store-context'
import { inDev } from '../../constants/Values'

const PathChangeListner = ()=>{
  const location = useLocation()
  useEffect(()=>{
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
        { inDev && <Header/>}
        <div style={{flexGrow: 1, minHeight: '100vh', maxWidth: 1340, width: '100%', margin: 'auto'}}>
          <Outlet/>
        </div>
        {storeData.footer  && <LazyLoadCustiom className='p-1 sun-editor-editable' dangerouslySetInnerHTML={{ __html: storeData.footer }} />}
          
    </>
  )
}

export default Container