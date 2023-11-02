import type { Point, Shape } from '../shapes'
import type { RootAction } from './reducer'

export const isPointInShape = ({ x, y }: Point, s: Shape): boolean => {
  const { point } = s

  if ('radius' in s) {
    const d = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2)

    return d <= s.radius
  }

  const [x1, y1] = [point.x, point.y + s.height] as const
  const [x2, y2] = [point.x + s.width, point.y] as const

  return x1 < x && x < x2 && y2 < y && y < y1
}

export const getMouseDownAction = (
  shapes: Shape[],
  isShift: boolean,
  p: Point
): RootAction => {
  for (const s of shapes) {
    // skip immediately if point is not in shape
    if (!isPointInShape(p, s)) continue

    // shift key causes diff behavior for unselected shapes
    return s.isSelected
      ? { type: 'DESELECT', payload: s }
      : isShift
      ? { type: 'MULTI_SELECT', payload: s }
      : { type: 'SELECT', payload: s }
  }

  // if all of the shapes get skipped then deselect all
  return { type: 'DESELECT_ALL' }
}
