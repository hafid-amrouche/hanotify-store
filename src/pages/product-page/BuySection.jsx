import React, { memo, useEffect, useRef, useState } from 'react'
import { checkHasEnoughTimePassed, isDifferenceMoreThan100Hours, isNum, parseFullName, translaste } from '../../utils/utils'
import BuyButton from '../../components/BuyButton'
import classes from './BuySection.module.css'
import { apiUrl } from '../../constants/Urls'
import Select from '../../components/tags/Select'
import TextInput from '../../components/tags/TextInput'
import Loader from '../../components/Loader'
import {useStoreContext} from '../../store/store-context'
import Accordiant from '../../components/Accordiant'
import { useNavigate, useParams } from 'react-router-dom'

const NoteSection = ({setClientNote, showCN, setShowCN})=>{
    useEffect(()=>{
        if (!showCN) setClientNote('')
    }, [showCN])
    return(
        <div className='d-flex mt-2'>
            <div className='d-flex align-items-center' onClick={()=>setShowCN(!showCN)} style={{cursor: 'pointer'}}>
                <Accordiant size={22} checked={showCN} setChecked={()=>{}} />
                <h4>{ translaste('Add note') }</h4>
            </div>
            { showCN && <textarea onBlur={e=>setClientNote(e.target.value)} className='input m-2'/>}
        </div>
    )
}

const BuySection = memo(({productData}) => {
    const [shippingCostByStateList, setShippingCostByStateList] = useState([
        {
            cost: 0,
            costToHome: 0,
            label: translaste('State'),
            id: null
        },
        ...productData.shippingCostByState
    ])

    const {storeData, addOrder, orders} = useStoreContext()
    const [selectedShipping, setSelectedShipping] = useState(shippingCostByStateList[0])

    const [quantity, setQuantity] = useState(1)
    const changeQuantiy=(delta)=>{
        setQuantity(qnty=>qnty+ delta)
    }
    
    const [stateCities, setStateCities] = useState([])
    const [city, setCity]=  useState({})
    const {language} = useStoreContext()
    const lang_prefix = language === 'ar' ? '_ar': '' 

    useEffect(()=>{
        const upadateCities = async()=>{
            let cities = await import(`../../json/cities/${selectedShipping.id}.json`);
            cities = cities.default
            cities = cities.map(city=>({
                ...city,
                label : city['name' + lang_prefix].split('-')[1]
            }))
            setStateCities(cities)
            setCity(cities[0])
        }
        if(selectedShipping.id) {
            upadateCities()
            setShippingCostByStateList(shippingCostByStateList=>shippingCostByStateList.filter(shippingCostByState=>shippingCostByState.id))
        }
    }, [selectedShipping])

    const [shippigAddress, setShippingAddress]=  useState('')
    const [fulllName, setFullName]=  useState('')
    const [phoneNumber, setphoneNumber]=  useState('')

    const {combinationIndex} = productData 

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {ordersData, setOrdersData} = useStoreContext()
    const orderId = ordersData[productData.productId]?.orderId
    const orderToken = ordersData[productData.productId]?.orderToken
    const {visitor} = useStoreContext()

    const hasSecondPassSinceLastRequest = useRef(true)

    const makeOrder=async()=>{
        try{
            const productLastOrder = orders[productId]
            const enoughTimePassed = checkHasEnoughTimePassed(productLastOrder)

            if(!visitor.isBlocked && enoughTimePassed){ 
                if (!hasSecondPassSinceLastRequest.current) return
                hasSecondPassSinceLastRequest.current = false
                setTimeout( ()=>{
                    hasSecondPassSinceLastRequest.current = true
                }, 1000)

                fetch(apiUrl + ( orderId ? '/orders/update-order' : '/orders/create-order'), {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application.json',
                    },
                    body: JSON.stringify({
                        phone_number: phoneNumber,
                        shippig_address: shippigAddress,
                        product_id: productData.productId,
                        shippingToHome: selectShippingType === 'costToHome',
                        state_id: selectedShipping.id,
                        city_id: city.id,
                        full_name: fulllName,
                        combination_index: combinationIndex, //
                        order_id: orderId,
                        order_token: orderToken,
                        tracker: visitor.tracker,
                        quantity: orderId ? undefined :quantity, 
                        combination_index: combinationIndex,
                    })
                }).then(response=>response.json().then(data=>{
                    if(ordersData.orderId !== data.orderId){
                        setOrdersData(ordersData=>({
                            ...ordersData,
                            [productData.productId]: data
                        }))
                    }
               }))}
        }catch(err){
            console.log(err)
        }     
    }
    
    const navigate= useNavigate()
    const phoneNumberValid = (phoneNumber.length >= 9 ) && (()=>{
        if(['05', '06', '07'].includes(phoneNumber.slice(0,2))){
            return phoneNumber.length === 10
        }
        else return true
    })()

    const fullNameValid = fulllName.trim()
    const enable = fullNameValid && phoneNumberValid && selectedShipping.id

    const {id: productId} = useParams()

    const productLastOrder = orders[productId]
    const enoughTimePassed = checkHasEnoughTimePassed(productLastOrder)

    const confirmOrder=async()=>{
        setLoading(true)
        setError(false)
        const order = {
            state_id: selectedShipping.id,
            order_id: orderId,
            order_token: orderToken,
            city_id: city.id,
            full_name: fulllName,
            combination_index: combinationIndex, //
            quantity, 
            tracker: visitor.tracker,
            shipping_address: shippigAddress,
            client_note: clientNote,
            shippingToHome: selectShippingType === 'costToHome',
            ...parseFullName(fulllName.trim())
        }
        const thankyouLink = `thank-you?order=${JSON.stringify({
            index: combinationIndex,
            productPrice: productData.price,
            totalPrice,
            quantity, 
            shippingCost : selectedShipping[selectShippingType],
            etp: enoughTimePassed,
        })}`
        try{
            if(!visitor.isBlocked && enoughTimePassed ){ 
                hasSecondPassSinceLastRequest.current = false
                setTimeout( ()=>{
                    hasSecondPassSinceLastRequest.current = true
                }, 1000)
                await fetch(apiUrl + '/orders/confirm-order', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application.json',
                    },
                    body: JSON.stringify(order)
                })
                setFullName('')
                setphoneNumber('')
                setShippingAddress('')
                setShowCN(false)
                setOrdersData(ordersData=>{
                    const newData = {...ordersData}
                    delete newData[productData.productId]
                    return newData
                })
                addOrder(productId)
                navigate(thankyouLink)
            }
            else{
                setTimeout(()=>{
                    setFullName('')
                    setphoneNumber('')
                    setLoading(false)
                    setClientNote('')
                    navigate(thankyouLink)
                }, 1200)
            } 
        }
        catch(err){
            console.log(err)
            setError(true)
            setLoading(false)
        } 
    }    
    
    const shippingToHomeExist = selectedShipping.costToHome !== null
    const shippingToOfficeExist = selectedShipping.cost !== null
    const [selectShippingType, setSelectShippingType] = useState(shippingToHomeExist ? 'costToHome' : 'cost')
    useEffect(()=>{
        setSelectShippingType(shippingToHomeExist ? 'costToHome' : 'cost')
    }, [selectedShipping])

    const totalPrice = productData.price * quantity + selectedShipping[selectShippingType]

    const firstCicleDone = useRef(false)
    useEffect(()=>{
        if (!firstCicleDone.current){
            firstCicleDone.current = true
            return
        }
        setError(false)
        if(phoneNumberValid) makeOrder()  
    }, [city, fulllName, phoneNumber, selectShippingType, combinationIndex ])

    const [clientNote, setClientNote]=  useState('')
    const [showCN, setShowCN] = useState(false)

    const setPhoneNumber =(value)=>{
        if (value ==='' || (value.startsWith('0') && isNum(value[value.length-1]))) setphoneNumber(value)   
    }
    return (
        <div className={classes['container'] + ' border p-1'} style={{ backgroundColor: 'var(--primary-transparent-color)', borderRadius: 'var(--border-radius-3)' }}>
            <div className={classes['container-info']}>
                <div className='d-flex align-items-center'>
                    <div className='col-6 p-1'>
                        <TextInput error={!fullNameValid} label={translaste('Full name')} value={fulllName} onChange={(value)=>setFullName(value)} />
                    </div>
                
                    <div className='col-6 p-1'>
                        <TextInput label={translaste('Phone number')} error={!phoneNumberValid  && fullNameValid} type='tel' value={phoneNumber} maxLength={10} onChange={setPhoneNumber}/>
                    </div>
                    <div className='col-6 p-1'>
                        <Select  error={phoneNumberValid && fullNameValid && !selectedShipping.id} options={shippingCostByStateList} setSelectedOption={setSelectedShipping} selectedOption={selectedShipping} keyExtractor={option=>option.id}/>
                    </div>
                    { <div className='col-6 p-1'>
                        { selectShippingType!=='cost' && stateCities.length > 0 && selectedShipping.id &&  <Select options={stateCities} setSelectedOption={setCity} selectedOption={city} keyExtractor={option=>option.id}/>}
                    </div>}
                    { storeData.askForAddress && <div className='col-12 p-1'>
                        <TextInput label='Address' value={shippigAddress} onChange={(value)=>setShippingAddress(value)} />
                    </div>}
                </div>
                { storeData.askForClientNote && <NoteSection  {...{showCN, setShowCN, setClientNote}} />}
            </div>
            <div className={'my-2'}>
                
                { (shippingToHomeExist || shippingToOfficeExist) && selectedShipping.id && <div>
                        <h4 className='p-1'>{ translaste('Shipping to') }</h4>
                        <div className='col-12 p-1 d-flex gap-2' >
                           {selectedShipping.costToHome!==null && <BuyButton  style={{maxWidth: '50%'}} className='flex-1 gap-1 justify-content-between' outline={selectShippingType==='cost'} onClick={()=>setSelectShippingType('costToHome')}>
                                { `${translaste('Home')}`}:  
                                <h4>
                                    {
                                        ` ${selectedShipping.costToHome == 0 ? translaste('Free') : `${selectedShipping.costToHome}${ translaste('DA')}`} `
                                    }
                                </h4>
                            </BuyButton>}
                            {selectedShipping.cost!==null && <BuyButton  style={{maxWidth: '50%'}} className='flex-1 gap-1 justify-content-between' outline={selectShippingType==='costToHome'} onClick={()=>setSelectShippingType('cost')}>
                                { `${translaste('Office')}`}: 
                                <h4>
                                    {
                                        ` ${selectedShipping.cost== 0 ? translaste('Free') : `${selectedShipping.cost}${ translaste('DA')}`} `
                                    }
                                </h4>
                            </BuyButton>} 
                        </div>
                            
                </div> }
               <div className='d-flex'>
                    <h4 className='col-6 p-1'>{translaste('Total price')}</h4>
                    <h4 className='number color-primary col-6  p-1 text-center'>{  totalPrice == 0 ? translaste('Free') : `${ totalPrice } ${translaste('DA')}`}</h4>
                </div>               
            </div>
            <div className='d-flex'>
                <div className='input-container d-flex gap-3 col-6 p-1'>
                    <div className='d-flex align-items-stretch flex-1 flex-stretch'>
                        <BuyButton style={{padding: '8px 14px'}} disabled={quantity <= 1 } onClick={()=>changeQuantiy(-1)}>
                            <i className="fa-solid fa-minus"/>
                        </BuyButton>
                        <div className='flex-1 d-flex justify-content-center align-items-center'>
                            <h4 className='color-primary' style={{verticalAlign:'center'}}>{quantity}</h4>
                        </div>
                        <BuyButton style={{padding: '8px 14px'}}  onClick={()=>changeQuantiy(+1)}>
                            <i className="fa-solid fa-plus"/>
                        </BuyButton>
                    </div>
                </div> 
                <div className='col-6 p-1'>
                    <BuyButton disabled={!enable || loading} onClick={()=>confirmOrder(orderId)}>
                        {translaste('Confirm order')}
                        { loading && <Loader diam={28}/>}
                    </BuyButton>
                </div>
            </div>
           
           { error && <div style={{color: 'red'}} className='p-2 d-flex justify-content-center col-12'>
                <h4>{ translaste('Your order was not submitted, please try again') }</h4>
            </div>}
        </div>  
    )
})

export default BuySection
