import React, { useEffect } from 'react'

const useHideHeader = () => {
  useEffect(()=>{
    const header = document.getElementById('main-header')
    header.style.display = 'none'
    return ()=>header.style.display = 'block'
  }, [])
}

export default useHideHeader