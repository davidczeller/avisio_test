import React from 'react'

import './Paper.scss'
import Tooltip from '../Common/Tooltip'
import Button from '../Common/Button'

import { useStateProviderValue } from '../../Services/StateProvider'

export default function Paper({ headerText, content, isButton, flex }) {
  const [{ data, sort_type }, dispatch] = useStateProviderValue();

  const setSortType = () => {
    if (sort_type === 'cost') {
      dispatch({
        type: 'SET_SORT_TYPE',
        sort_type: 'quantity'
      })
    } else {
      dispatch({
        type: 'SET_SORT_TYPE',
        sort_type: 'cost'
      })
    }
  }

  return (
    <div className='paper_container' style={{ flex }}>
      <div className="top_container">
        <div className="header">{headerText}</div>
        {isButton && (
          <Button
            className="menu-trigger"
            icon={
              sort_type === 'cost'
                ? <img src="https://img.icons8.com/ios/24/ffffff/euro-pound-exchange.png" />
                : <img src="https://img.icons8.com/ios/24/ffffff/negative-dynamic.png" />
            }

            tooltip={sort_type === 'cost' ? 'Sort By Quantity' : 'Sort By Cost'}
            tooltipDirection='bottom'
            handleClick={() => setSortType()}
          />
        )}
      </div>
      {content}
    </div>
  )
}
