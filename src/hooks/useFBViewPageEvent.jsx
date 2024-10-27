import React, { useEffect } from 'react'
import { useStoreContext } from '../store/store-context';

const useFBViewPageEvent = () => {
    const {storeData, visitor} = useStoreContext()
    const {facebookPixelsId} = storeData
    useEffect(()=>{
        if(facebookPixelsId?.length > 0 && !visitor.isBlocked) window.fbq('track', 'PageView');
    }, [facebookPixelsId])
}

export default useFBViewPageEvent