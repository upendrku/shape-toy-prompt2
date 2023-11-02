/* eslint-disable no-case-declarations */
import type { Point, Shape } from '../shapes'

type AddAction = {
  type: 'ADD'
  payload: Shape
}
type SelectAction = {
  type: 'SELECT'
  payload: Shape
}

type MoveAction = {
  type: 'MOVE'
  payload: {
    shape: Shape
    point: Point
  }
}

type DeleteAction = {
  type: 'DELETE'
  payload: Shape
}

type UpdateAction = {
  type: 'UPDATE'
  payload: Shape
}

type MultiSelectAction = {
  type: 'MULTI_SELECT'
  payload: Shape
}

type DeselectAction = {
  type: 'DESELECT'
  payload: Shape
}

type DeselectAllAction = {
  type: 'DESELECT_ALL'
}

type HighlightAction = {
  type: 'HIGHLIGHT'
  payload: Shape
}

type RemoveHighlightAction = {
  type: 'REMOVE_HIGHLIGHT'
}

export type RootAction =
  | AddAction
  | SelectAction
  | MultiSelectAction
  | DeselectAction
  | DeselectAllAction
  | HighlightAction
  | RemoveHighlightAction
  | MoveAction
  | DeleteAction
  | UpdateAction

export type RootState = {
  entities: Record<string, Shape>
  ids: string[]
  selected: string[]
  highlighted: string
}

export const reducer = (state: RootState, action: RootAction): RootState => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      }
    case 'SELECT':
      const entities = state.selected.reduce<Record<string, Shape>>(
        (shapes, id) => {
          const s = shapes[id]
          if (!s) return shapes

          return {
            ...shapes,
            [id]: { ...s, isSelected: false },
          }
        },
        {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            isSelected: true,
          },
        }
      )

      return {
        ...state,
        selected: [action.payload.id],
        entities,
      }
    case 'MULTI_SELECT':
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            isSelected: true,
          },
        },
        selected: [...state.selected, action.payload.id],
      }
    case 'DESELECT':
      const newSelected = state.selected.filter((s) => action.payload.id !== s)

      const { highlighted: hilyted, entities: ets } = state

      return {
        ...state,
        //@ts-expect-error dynamic key will be there (maybe? needs test) because of in check
        entities: {
          ...ets,
          // this should make old highlighted shape not highlighted
          ...(hilyted && hilyted in ets
            ? { [hilyted]: { ...ets[hilyted], isHighlighted: false } }
            : {}),
          [action.payload.id]: {
            ...action.payload,
            isSelected: false,
            // dont highlight deselected shape during multi-drag
            isHighlighted: newSelected.length == 0,
          },
        },
        selected: newSelected,
        // dont highlight deselected shape during multi-drag
        highlighted: newSelected.length > 0 ? '' : action.payload.id,
      }
    case 'DESELECT_ALL':
      return {
        ...state,
        selected: [],
        entities: state.selected.reduce<Record<string, Shape>>((shapes, id) => {
          const s = shapes[id]
          if (!s) return shapes

          return {
            ...shapes,
            [id]: { ...s, isSelected: false },
          }
        }, state.entities),
      }
    case 'HIGHLIGHT':
      const { highlighted, entities: ents } = state

      return {
        ...state,
        //@ts-expect-error dynamic key will be there (maybe? needs test) because of in check
        entities: {
          ...ents,
          // this should make old highlighted shape not highlighted
          ...(highlighted && highlighted in ents
            ? { [highlighted]: { ...ents[highlighted], isHighlighted: false } }
            : {}),
          [action.payload.id]: {
            ...action.payload,
            isHighlighted: true,
          },
        },
        highlighted: action.payload.id,
      }
    case 'REMOVE_HIGHLIGHT':
      const hs = state.entities[state.highlighted]
      if (!hs) return state
      return {
        ...state,
        entities: {
          ...state.entities,
          [state.highlighted]: {
            ...hs,
            isHighlighted: false,
          },
        },
        highlighted: '',
      }
    case 'MOVE':
      const { point, shape } = action.payload

      return {
        ...state,
        entities: {
          ...state.entities,
          [shape.id]: {
            ...shape,
            point: {
              x: point.x,
              y: point.y,
            },
            // there is nothing obvious that mutates the shape before dispatching move action
            // only point should be different
            isHighlighted: shape.id == state.highlighted,
          },
        },
      }
    case 'DELETE':
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars
      const { [action.payload.id]: removed, ...kept } = state.entities

      return {
        ids: state.ids.filter((s) => s !== action.payload.id),
        entities: kept,
        selected: state.selected.filter((s) => s !== action.payload.id),
        highlighted:
          state.highlighted == action.payload.id ? '' : state.highlighted,
      }
    case 'UPDATE':
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      }
    default:
      return state
  }
}

export const initialState: RootState = {
  entities: {},
  ids: [],
  selected: [],
  highlighted: '',
}

const makeShapeSelector =
  (key: 'ids' | 'selected') =>
  (state: RootState): Shape[] => {
    const shapes: Shape[] = []

    for (const id of state[key]) {
      const s = state.entities[id]
      if (s) shapes.push(s)
    }

    return shapes
  }

export const getShapes = makeShapeSelector('ids')
export const getSelectedShapes = makeShapeSelector('selected')
