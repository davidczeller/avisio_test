import React, { useState } from 'react'

import TopProducts from './Cards/TopProducts/TopProducts'
import Deliveries from './Cards/Deliveries/Deliveries'
import SupplierRanking from './Cards/SupplierRanking/SupplierRanking'
import OrderVolume from './Cards/OrderVolume/OrderVolume'
import './Dashboard.scss'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
                      // className='asd'
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
    </div >
  )
}
