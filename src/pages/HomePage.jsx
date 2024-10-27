import React, { useEffect, useState } from 'react'
import { apiUrl } from '../constants/Urls'
import BlockSection  from '../components/BlockSection'
import { useStoreContext } from '../store/store-context'

const host = window.location.host
const HomePage = () => {
  const [sections, setSections] = useState(null)
  const [generalDesign, setGeneralDesign] = useState(null)
  const {theme, device, setPageBg} = useStoreContext()

  useEffect(()=>{
    fetch(
      apiUrl + '/store/store-home-page-sections?domain='+host.replace('8080', '3001'),
    ).then((response)=>{
      response.json().then(data=>{
        setSections(data.sections)
        setGeneralDesign(data.generalDesign)
      })
    })
  }, [])

  useEffect(()=>{
    if(generalDesign) setPageBg(generalDesign[device].backgroundColor[theme])
    return setPageBg(undefined)
  }, [generalDesign])
  return (
    generalDesign && <div style={{
        background: generalDesign[device].backgroundColor[theme], 
        flex: 1,
        '--swiper-theme-color': "var(--primaryColor)"
      }} >
      {
        sections && sections.map(section=>(
          <BlockSection key={section.id} section={section} />
        ))
      }
    </div>
  )
}

export default HomePage