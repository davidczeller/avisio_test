import React, { useState, useEffect } from 'react'

import Tooltip from '../Common/Tooltip'
import './Button.scss'

export default function Button({ handleClick, title, icon, size, tooltip, tooltipDirection, marginTop, noPadding }) {

  const [buttonSize, setButtonSize] = useState('1,2rem')

  const small = '1rem'
  const medium = '1.2rem'
  const large = '1.6rem'


  useEffect(() => {
    if (size === 'small') setButtonSize(small)
    if (size === 'medium') setButtonSize(medium)
    if (size === 'large') setButtonSize(large)
  }, [size])

  return (
    tooltip ? (
      <Tooltip
        content={tooltip}
        direction={tooltipDirection}>
        <button
          onClick={() => handleClick()}
          style={{ fontSize: buttonSize, marginTop: marginTop ? { marginTop } : '-16px', padding: noPadding ? '0' : '4px' }}
        >
          {title || icon}
        </button>
      </Tooltip>
    ) : (
        <button
          onClick={() => handleClick()}
          style={{ fontSize: buttonSize }}
        >
          {title || icon}
        </button>
      )
  )
}
