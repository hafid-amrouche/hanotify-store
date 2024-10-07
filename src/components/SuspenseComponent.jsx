import React, { Suspense } from 'react'
import Loading from './Loading'

const SuspenseComponent = ({Component, fallback=true, ...props}) => {
  return (
      <Suspense fallback={fallback && <Loading/>}>
        <Component { ...props }/>
      </Suspense>
  )
}

export default SuspenseComponent