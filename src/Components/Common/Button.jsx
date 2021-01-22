import React, { useState, useEffect } from 'react'

import Tooltip from '../Common/Tooltip'
import './Button.scss'

export default function Button({ handleClick, title, icon, size, tooltip, tooltipDirection }) {

  const [buttonSize, setButtonSize] = useState('1,2rem')

  const small = '1rem'
  const medium = '1.2rem'
  const large = '1.6rem'

  console.log({ size, buttonSize })

  useEffect(() => {
    if (size === 'small') setButtonSize(small)
    if (size === 'medium') setButtonSize(medium)
    if (size === 'large') setButtonSize(large)
  }, [size])

  console.log(tooltip)
  return (
    tooltip ? (
      <Tooltip
        // content={sortType === 'cost' ? 'Sort By Quantity' : 'Sort By Cost'}
        content={tooltip}
        direction={tooltipDirection}>
        <button
          onClick={() => handleClick()}
          style={{ fontSize: buttonSize }}
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
