import React, { useState, useEffect } from 'react'

import Tooltip from '../Common/Tooltip'
import './Button.scss'

export default function Button({ handleClick, title, icon, size, tooltip, tooltipDirection, marginTop, noPadding }) {

  const [buttonSize, setButtonSize] = useState('1.2rem')

  const sizes = {
    small: '1rem',
    medium: '1.2rem',
    large: '1.6rem'
  }

  useEffect(() => {
    setButtonSize(sizes[size])
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
