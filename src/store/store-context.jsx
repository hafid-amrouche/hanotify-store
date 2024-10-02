import { createContext, useContext, useEffect,  useMemo,  useState } from "react"
import { darkenHexColor, getColorScheme } from "../utils/utils"
import { apiUrl } from "../constants/Urls"
import FacebookPixel from "../components/FacebookPixel"
import { inDev } from '../constants/Values'

const root = document.getElementById('root')

const StoreContext = createContext({
    theme: 'light',
    toggleTheme: ()=>{},
    storeData: {
        logo: null,
        favicon: null,
        askForClientNote: true,
        askForAddress: true,
        facebookPixelsId: null,
    },
    language: 'en',
    errorBeowserData: null,
    setErrorStoreData: ()=>{},
    colors: null,
    visitor: null,
    setVisitor: ()=>{},
    orders: {},
    setOrders: ()=>{},
    addOrder: (productId)=>{}
})
const ordersDatafromLocaleStorage = localStorage.getItem('ordersData')

const defaultOrdersData = ordersDatafromLocaleStorage ? JSON.parse(ordersDatafromLocaleStorage) : {}

// visitor

const host = window.location.host;

let storeFromLocaleStorage = localStorage.getItem(host)
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


if (inDev){
    window.storeData = {
        "id": 43,
        "primaryColor": "#bca08a",
        "bordersRounded": true,
        "logo": "http://files.localhost:8080//media//users/58/stores/43/48.png",
        "name": "qsdqd qsdqds",
        "description": "",
        "favicon": null,
        "headerOutlined": false,
        "language": "ar",
        "mode": "light",
        "facebookPixelsId": [
            "1734156917355822"
        ],
        "primaryColorDark": "#bca08a",
        "footer": "<p style=\"text-align: center\"><span style=\"font-size: 16px;font-family: Comic Sans MS\"><strong>.جميع الحقوق محفوظة لشركة براء ميناج Baraa Ménage l عام 2024</strong></span></p><div class=\"se-component se-image-container __se__float-center\"><figure style=\"width: 107px;\"><p style=\"text-align: center\"><img loading=\"lazy\" src=\"http://files.localhost:8080//media//users/58/stores/43/images/6.webp\" alt=\"\" data-rotate=\"\" data-proportion=\"true\" data-size=\"107px,106px\" data-align=\"center\" data-file-name=\"17136688749101713668869360main.webp\" data-file-size=\"11440\" data-origin=\",\" origin-size=\"640,1000\" style=\"width: 107px; height: 106px;\"></p></figure></div>"
    }  
}

const themeFromLocaleStorage = localStorage.getItem('theme')
const themeMode = window.storeData.mode

const defaultOrdersFromLocaleStore = localStorage.getItem('orders') 
const defaultOrders = defaultOrdersFromLocaleStore ? JSON.parse(defaultOrdersFromLocaleStore) : {}

const StoreContextProvider=({children})=>{
    // theme
    const defaultTheme = themeMode === 'auto' ? (themeFromLocaleStorage ? themeFromLocaleStorage : getColorScheme()) : themeMode
    const [theme, setTheme] = useState(defaultTheme)
    const toggleTheme = ()=> setTheme(state =>state === 'light' ? 'dark' : 'light')
    useEffect(()=>{
        localStorage.setItem('theme', theme)
    }, [theme])
   

    // store data
    const storeData = useMemo(()=>({
        askForClientNote: false,
        askForAddress: false,
        facebookPixelsId: inDev ? ['1734156917355822', '1734256317355822'] : [],
        ...window.storeData
    }), [])

    // language 
    const language = window.storeData.language || 'ar'
    useEffect(()=>{
        document.documentElement.setAttribute('lang', language)
        if (language === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl')
            root.style.setProperty(
                '--lang--100', '100%'
            )
        }
        else {
            document.documentElement.setAttribute('dir', 'ltr')
            root.style.setProperty(
                '--lang--100', '-100%'
            )
        }
    }, [language])
   
    // colors
    const [colors, setColors] =useState({})
    useEffect(()=>{

        const primary = storeData.primaryColor
        const primaryDark = storeData.primaryColorDark
        let colors ={}
        if (theme === 'dark'){
            colors['--text-color'] = '#ffffff'
            colors['--header-text-color'] = '#ffffff'
            colors['--container-color'] = '#000000'
            colors['--background-color'] = '#1a1a1a'
            colors['--primary-color'] = primaryDark
            colors['--primary-fading-color'] = primaryDark + '80'
            colors['--primary-transparent-color'] = primaryDark + '20'
            colors['--primary-dark-color'] = darkenHexColor(primaryDark, -20)
            colors['--grey-color'] = '#666666'
            colors['--grey100-color'] = '#909090'
            colors['--border-color'] = '#99999980'
        }else{
            colors['--text-color'] = '#11181C'
            colors['--header-text-color'] = '#ffffff'
            colors['--container-color'] = '#e8e8e8'
            colors['--background-color'] = '#ffffff'
            colors['--primary-color'] = primary
            colors['--primary-fading-color'] = primary +'80'
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
    }, [theme ,storeData.primaryColor])
    
    useEffect(()=>{
        if(storeData.bordersRounded) { 
            root.style.setProperty(
                '--border-radius-1', '4px'
            )
            root.style.setProperty(
                '--border-radius-2', '8px'
            )
            root.style.setProperty(
                '--border-radius-3', '12px'
            )
        }
        else{
            root.style.setProperty(
                '--border-radius-1', '0'
            )
            root.style.setProperty(
                '--border-radius-2', '0'
            )
            root.style.setProperty(
                '--border-radius-3', '0'
            )
        }
    }, [storeData.bordersRounded])

    const [ordersData, setOrdersData] = useState(defaultOrdersData) //{/* finish from here */}
    useEffect(()=>{
        localStorage.setItem('ordersData', JSON.stringify(ordersData))
    }, [ordersData])

    // check last order from a product
    const [orders, setOrders] = useState(defaultOrders) 
    useEffect(()=>{
        localStorage.setItem('orders', JSON.stringify(orders) )
    }, [orders])
    
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
              id: host,
              tracker : visitor?.tracker
            })
          },
        ).then(response=>response.json().then(data=>{
          setVisitor(data)
        }))
    }, [])
    useEffect(()=>{
        if(visitor){
            localStorage.setItem(host, JSON.stringify({
                tracker : visitor.tracker,
                flag: visitor.isBlocked ? 1 : 2
            }))
        }
        
    }, [visitor])

    const addOrder = (productId)=>{
        setOrders(orders=>{
            const newOrders = {...orders}
            if (newOrders[productId]){
                newOrders[productId]={
                    lastOrderTime: Date.now(),
                    times : newOrders[productId].times + 1
                }
            }
            else {
                newOrders[productId]={
                    lastOrderTime: Date.now(),
                    times : 1
                }
            }
            return newOrders
        })
    }
    
    // default context value
    const defaultStoreValue={
        theme,
        toggleTheme,
        storeData,
        colors,
        ordersData, 
        setOrdersData,
        visitor,
        setVisitor,
        language,
        orders, setOrders,addOrder
    }
    return(
        <StoreContext.Provider value={defaultStoreValue}>
            { storeData.facebookPixelsId.length > 0 && <FacebookPixel facebookPixelsId={storeData.facebookPixelsId} /> }
            <div style={{display: "flex", flexDirection: 'column', minHeight:'100%'}}  id='app'>
                { storeData.primaryColor && children} 
            </div>
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
export const useStoreContext = ()=> useContext(StoreContext)
