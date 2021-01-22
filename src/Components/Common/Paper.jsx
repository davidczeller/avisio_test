import React from 'react'

import './Paper.scss'
import Tooltip from '../Common/Tooltip'
import Button from '../Common/Button'

import { useStateProviderValue } from '../../Services/StateProvider'

export default function Paper({ headerText, content, isButton, flex, marginLeft }) {
  const [{ data, sortType }, dispatch] = useStateProviderValue();

  const setSortType = () => {
    if (sortType === 'cost') {
      dispatch({
        type: 'SET_SORT_TYPE',
        sortType: 'quantity'
      })
    } else {
      dispatch({
        type: 'SET_SORT_TYPE',
        sortType: 'cost'
      })
    }
  }

  return (
    <div className='paper_container' style={{ flex, marginLeft: marginLeft ? 24 : 0 }}>
      <div className="top_container">
        <div className="header">{headerText}</div>
        {isButton && (
          <Button
            className="menu-trigger"
            icon={
              sortType === 'cost'
                ? <img src="https://img.icons8.com/ios/24/ffffff/euro-pound-exchange.png" />
                : <img src="https://img.icons8.com/ios/24/ffffff/negative-dynamic.png" />
            }

            tooltip={sortType === 'cost' ? 'Sort By Quantity' : 'Sort By Cost'}
            tooltipDirection='bottom'
            handleClick={() => setSortType()}
          />
        )}
      </div>
      {content}
    </div>
  )
}
