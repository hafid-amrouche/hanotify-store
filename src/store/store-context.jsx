import { createContext, useContext, useEffect,  useState } from "react"
import { darkenHexColor } from "../utils/utils"
import logo from '../assets/react.svg'
import { apiUrl, domain } from "../constants/Urls"

const root = document.getElementById('root')

const StoreContext = createContext({
    theme: 'light',
    toggleTheme: ()=>{},
    storeData: {
        logo: logo
    },
    setStoreData: ()=>{},
    errorBeowserData: null,
    setErrorStoreData: ()=>{},
    colors: null
})
const ordersDatafromLocaleStorage = localStorage.getItem('ordersData')

const defaultOrdersData = ordersDatafromLocaleStorage ? JSON.parse(ordersDatafromLocaleStorage) : {}

// visitor
const hostname = window.location.hostname
let has_custom_domain = !hostname.endsWith(domain)

let id = null
if (has_custom_domain){
    id = hostname.replace(hostname)
}else{
    id = hostname.replace('.' + domain, '')
}

let storeFromLocaleStorage = localStorage.getItem('store-' + window.location.hostname)
if (storeFromLocaleStorage) {
    storeFromLocaleStorage = JSON.parse(storeFromLocaleStorage) 
    storeFromLocaleStorage.isBlocked = (storeFromLocaleStorage.flag == 1)
    delete storeFromLocaleStorage.flag
}   
else{
    storeFromLocaleStorage = {
        isBlocked : false,
        tracker: null
    }
}

const StoreContextProvider=({children})=>{
    // theme
    const defaultTheme = localStorage.getItem('theme') || 'light'
    const [theme, setTheme] = useState(defaultTheme)
    const toggleTheme = ()=> setTheme(state =>state === 'light' ? 'dark' : 'light')
   
    // useEffect(()=>{
    //     localStorage.setItem('theme', theme)
    // }, [theme])
   
    // store data
    const [storeData, setStoreData] = useState({
        logo
    })

    // colors
    const [colors, setColors] =useState({})
    useEffect(()=>{

        const primary = '#c259ff'
        let colors ={}
        if (theme === 'dark'){
            colors['--text-color'] = '#ffffff'
            colors['--header-text-color'] = '#ffffff'
            colors['--container-color'] = '#262829'
            colors['--background-color'] = '#000000'
            colors['--primary-color'] = primary
            colors['--primary-fading-color'] = primary + '60'
            colors['--primary-transparent-color'] = primary + '20'
            colors['--primary-dark-color'] = darkenHexColor(primary, -20)
            colors['--grey-color'] = '#666666'
            colors['--grey100-color'] = '#909090'
            colors['--border-color'] = '#99999980'
        }else{
            colors['--text-color'] = '#11181C'
            colors['--header-text-color'] = '#ffffff'
            colors['--container-color'] = '#e8e8e8'
            colors['--background-color'] = '#ffffff'
            colors['--primary-color'] = primary
            colors['--primary-fading-color'] = primary +'60'
            colors['--primary-transparent-color'] = primary + '20'
            colors['--primary-dark-color'] = darkenHexColor(primary, 20)
            colors['--grey-color'] = '#707070'
            colors['--grey100-color'] = '#505050'
            colors['--border-color'] = '#80808080'
        }
        setColors(colors)
        for (let key in colors) {
            root.style.setProperty([key], colors[key])
        }
      }, [theme])

      const [ordersData, setOrdersData] = useState(defaultOrdersData) //{/* finish from here */}
      useEffect(()=>{
        localStorage.setItem('ordersData', JSON.stringify(ordersData))
      }, [ordersData])
    
    // visitor tracking
    const [visitor, setVisitor] = useState(storeFromLocaleStorage)
    useEffect(()=>{
    
        fetch(
          apiUrl + '/store/check-visitor',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              has_custom_domain,
              id,
              tracker : visitor?.tracker
            })
          },
        ).then(response=>response.json().then(data=>{
          setVisitor(data)
        }))
    }, [])
    useEffect(()=>{
        if(visitor){localStorage.setItem('store-' + window.location.hostname, JSON.stringify({
            tracker : visitor.tracker,
            flag: visitor.isBlocked ? 1 : 2
          }))}
    }, [visitor])
    // default context value
    const defaultStoreValue={
        theme,
        toggleTheme,
        storeData,
        setStoreData,
        colors,
        ordersData, 
        setOrdersData,
        visitor,
        setVisitor
    }
    return(
        <StoreContext.Provider value={defaultStoreValue}>
            <div style={{display: "flex", flexDirection: 'column', minHeight:'100%'}}  id='app'>
                { storeData && children} 
            </div>
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
export const useStoreContext = ()=> useContext(StoreContext)
