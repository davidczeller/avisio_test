import React from 'react'

import './Paper.scss'
import Tooltip from '../BaseComponents/Tooltip'
import Button from '../BaseComponents/Button'

import { useStateProviderValue } from '../../Services/StateProvider'

export default function Paper({ headerText, content, showButton, flex, buttonIcon, handleClick, tooltip }) {
  const [{ data }, dispatch] = useStateProviderValue();

  return (
    <div className='paper_container' style={{ flex }}>
      <div className="top_container">
        <div className="header">{headerText}</div>
        {showButton && (
          <Button
            className="menu-trigger"
            buttonIcon={buttonIcon}
            tooltip={tooltip}
            tooltipDirection='bottom'
            handleClick={() => handleClick()}
          />
        )}
      </div>
      {content}
    </div>
  )
}
