import React, { useState } from 'react'

import TopProducts from './Cards/TopProducts/TopProducts'
import Deliveries from './Cards/Deliveries/Deliveries'
import SupplierRanking from './Cards/SupplierRanking/SupplierRanking'
import OrderVolume from './Cards/OrderVolume/OrderVolume'
import './Dashboard.scss'

import { useStateProviderValue } from '../../Services/StateProvider'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ContentLoader from "react-content-loader"

const paperArr = [
  {
    id: 'card1',
    content: <OrderVolume />,
    show: true
  },
  {
    id: 'card2',
    content: <SupplierRanking />,
    show: true
  },
  {
    id: 'card3',
    content: <Deliveries />,
    show: true
  },
  {
    id: 'card4',
    content: <TopProducts />,
    show: true
  },
]

export default function Dashboard() {
  const [{ loading, isDesktop },] = useStateProviderValue()
  const [papers, updatePapers] = useState(paperArr)

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(papers)
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)

    updatePapers(items)
  }

  return (
    <div>
      <div className="title">Dashboard</div>
      {loading ? (
        <ContentLoader
          speed={1}
          width={'100vw'}
          height={'60vh'}
          viewBox="0 0 98 0"
          backgroundColor="#e2e2e2"
          foregroundColor="#6bdaeb66"
        >
          <rect x="0" y="26vh" rx="6" ry="6" width="65vw" height="320" />
          <rect x="66vw" y="26vh" rx="6" ry="6" width="32vw" height="320" />
          <rect x="0" y="51vh" rx="6" ry="6" width="65vw" height="220" />
          <rect x="66vw" y="51vh" rx="6" ry="6" width="32vw" height="220" />
        </ContentLoader>
      ) : (
          <div className="dashboard_container">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='papers'>
                {provided => (
                  <div
                    className='paper_outer_container'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {papers.map(({ id, content }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {provided => (
                          <div
                            className='paper_inner_container'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
    </div >
  )
}
