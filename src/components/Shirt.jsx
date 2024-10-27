import React from 'react'

const Shirt = ({fill, aspectRatio=1}) => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={'#00000000'}
    style={{
      width: '100%',
      aspectRatio
    }}
    viewBox="0 0 24 24"
  >
    <path
        d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
    />
  </svg>
  )
}

export default Shirt