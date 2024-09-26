import React, { useEffect, useState } from 'react'
import { filesUrl } from '../constants/Urls'

const TermsOfService = () => {
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const getThankYouData=async()=>{
    const response = await fetch(filesUrl + '/get-terms-of-service?domain=' + window.location.host) 
    if (!response.ok){
        setError(true)
        return;
    }
    const data = await response.json()

    setMessage(data)
}

  useEffect(()=>{
      getThankYouData()
  }, [])
  useEffect(() => {
    // Dynamically import CSS based on the theme
    const loadRichTextCss = async () => {
      if (message) {
        console.log('CSS Fetched')
        await import('../css/suneditor-contents.css');
      }
    };
    loadRichTextCss();
  }, [message]);
  return (
    message &&
      <div className='container m-auto mt-3'>
          <div className='sun-editor-editable' dangerouslySetInnerHTML={{ __html: message }} />
      </div>
  )
}

export default TermsOfService