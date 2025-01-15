import React from 'react'
import Card from '../Card/Card'
import './Grid.css'

function Grid(count) {
    const cards = []

    for (let i = 0; i < count.index; i++) {
        cards.push(<Card key={i} />)
    }
  return <div className="grid">{cards}</div>
}
export default Grid
