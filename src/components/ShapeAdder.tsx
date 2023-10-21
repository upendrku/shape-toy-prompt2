import type { Dispatch } from 'react'
import type { RootAction } from '../func/reducer'

import { nanoid } from 'nanoid'
import React from 'react'

type ShapeAdderProps = {
  dispatch: Dispatch<RootAction>
}

export const ShapeAdder = ({ dispatch }: ShapeAdderProps) => {
  function onAddCircle() {
    dispatch({
      type: 'ADD',
      payload: {
        id: nanoid(16),
        radius: 50,
        point: {
          x: 75,
          y: 75,
        },
        color: 'black',
        isSelected: false,
        isHighlighted: false,
      },
    })
  }

  function onAddRectangle() {
    dispatch({
      type: 'ADD',
      payload: {
        id: nanoid(16),
        height: 100,
        width: 100,
        point: { x: 25, y: 25 },
        color: 'black',
        isSelected: false,
        isHighlighted: false,
      },
    })
  }

  const shapes = [
    ['Circle', onAddCircle],
    ['Rectangle', onAddRectangle],
  ] as const

  return (
    <div className="flex flex-col gap-2">
      {shapes.map(([shape, onClick]) => {
        return (
          <button
            className="border-2 border-gray-600 px-4 py-1"
            key={shape}
            onClick={onClick}
          >{`Add ${shape}`}</button>
        )
      })}
    </div>
  )
}
