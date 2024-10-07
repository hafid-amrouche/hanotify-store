import { createContext, useContext, useEffect,  useMemo,  useState } from "react"
import { darkenHexColor, getColorScheme } from "../utils/utils"
import { apiUrl } from "../constants/Urls"
import FacebookPixel from "../components/FacebookPixel"
import { inDev, ltr, rtl } from '../constants/Values'
import useGetCurrentScreenWidth from "../hooks/useGetCurrentScreenWidth"

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
    addOrder: (productId)=>{},
    langTerms: rtl,
    device: 'mobile'
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
        "primaryColor": "#815b3f",
        "bordersRounded": true,
        "logo": "http://files.localhost:8080//media//users/58/stores/43/48.png",
        "name": "qsdqd qsdqds",
        "description": "",
        "favicon": null,
        "headerOutlined": false,
        "language": "fr",
        "mode": "light",
        "facebookPixelsId": [
            "1734156917355822"
        ],
        "primaryColorDark": "#815b3f",
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
    const [storeData, setStoreData] = useState({
        askForClientNote: false,
        askForAddress: false,
        facebookPixelsId: inDev ? ['1734156917355822', '1734256317355822'] : [],
        ...window.storeData
    })

    // language 
    const language = window.storeData.language || 'ar'
    console.log(language) 
    useEffect(()=>{
        document.documentElement.setAttribute('lang', language)
        localStorage.setItem('language', language)
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
        let newColors ={}
        if (theme === 'dark'){
            newColors['--textColor'] = '#ffffff'
            newColors['--containerColor'] = '#000000'
            newColors['--backgroundColor'] = '#1a1a1a'
            newColors['--primaryColor'] = primaryDark
            newColors['--primary-fading-color'] = primaryDark + '80'
            newColors['--primary-transparent-color'] = primaryDark + '20'
            newColors['--primary-dark-color'] = darkenHexColor(primaryDark, -20)
            newColors['---greyColor'] = '#666666'
            newColors['--grey100-color'] = '#909090'
            newColors['--border-color'] = '#99999980'
        }else{
            newColors['--primaryColor'] = primary
            newColors['--textColor'] = '#11181C'
            newColors['--containerColor'] = '#fafafa'
            newColors['--backgroundColor'] = '#ffffff'
            newColors['--primary-fading-color'] = primary +'80'
            newColors['--primary-transparent-color'] = primary + '20'
            newColors['--primary-dark-color'] = darkenHexColor(primary, 20)
            newColors['---greyColor'] = '#707070'
            newColors['--grey100-color'] = '#505050'
            newColors['--border-color'] = '#80808080'
        }
        setColors(newColors)
        for (let key in newColors) {
            root.style.setProperty([key], newColors[key])
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
    
    const setColor= (id, value)=>{
       setColors(colors=>({
        ...colors,
        [id]: value,
       }))
       root.style.setProperty([id], value)
    }

    const [pageBg, setPageBg] = useState(undefined)

    const screenWidth = useGetCurrentScreenWidth()
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
        orders, setOrders,addOrder,
        langTerms: language === 'ar' ? rtl : ltr,
        device: screenWidth > 450 ? 'PC' : 'mobile',
        setColor,
        pageBg, setPageBg, screenWidth
    }

    const fetchChildren = storeData.primaryColor && (JSON.stringify({}) !== JSON.stringify(colors))
    return(
        <StoreContext.Provider value={defaultStoreValue}>
            { storeData.facebookPixelsId.length > 0 && <FacebookPixel facebookPixelsId={storeData.facebookPixelsId} /> }
            <div key={colors} style={{display: "flex", flexDirection: 'column', minHeight:'100%', backgroundColor: pageBg}}  id='app'>
                { fetchChildren && children} 
            </div>
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
export const useStoreContext = ()=> useContext(StoreContext)
