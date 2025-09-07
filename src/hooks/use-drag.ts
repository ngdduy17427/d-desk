import React from 'react'
import { clamp } from 'utils/utils-helper'
import { useContainerSize } from './use-container-size'

type UseDragProps<T> = {
  dragRef: T
  dragLayerRef?: Array<T>
  isDraggable?: boolean
  onDragStart?: () => void
  container?: HTMLElement
}

type DragPosition = {
  top: number | undefined
  left: number | undefined
  bottom: number | undefined
  right: number | undefined
}

type DragState = {
  isPressing: boolean
  isDragging: boolean
  relCursor: {
    relX: number
    relY: number
  }
  position: DragPosition
}

export type Drag = {
  dragState: {
    isDragging: boolean
    position: DragPosition
  }
}

export const useDrag = <T extends HTMLElement>({
  dragRef,
  dragLayerRef,
  isDraggable = true,
  onDragStart,
  container,
}: UseDragProps<T>): Drag => {
  const containerSize = useContainerSize(container)
  const [dragState, setDragState] = React.useState<DragState>({
    isPressing: false,
    isDragging: false,
    relCursor: {
      relX: 0,
      relY: 0,
    },
    position: {
      top: undefined,
      left: undefined,
      bottom: undefined,
      right: undefined,
    },
  })

  const overrideEventDefaults = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onInitRelCursor = React.useCallback(
    (x: number, y: number) => {
      requestAnimationFrame(() => {
        setDragState(
          (prevState): DragState => ({
            ...prevState,
            isPressing: true,
            relCursor: {
              relX: Math.floor(x - dragRef.getBoundingClientRect().left),
              relY: Math.floor(y - dragRef.getBoundingClientRect().top),
            },
          }),
        )
      })
    },
    [dragRef],
  )

  const onMoveElement = React.useCallback(
    (x: number, y: number) => {
      requestAnimationFrame(() => {
        setDragState(
          (prevState): DragState => ({
            ...prevState,
            isDragging: true,
          }),
        )

        let posTop: any = y - dragState.relCursor.relY
        let posLeft: any = x - dragState.relCursor.relX
        let posBottom: any =
          containerSize.offsetHeight - dragRef.offsetHeight - posTop + containerSize.offsetTop
        let posRight: any =
          containerSize.offsetWidth - dragRef.offsetWidth - posLeft + containerSize.offsetLeft

        posTop = clamp(
          posTop,
          containerSize.offsetTop,
          containerSize.offsetHeight - dragRef.offsetHeight + containerSize.offsetTop,
        )
        posLeft = clamp(
          posLeft,
          containerSize.offsetLeft,
          containerSize.offsetWidth - dragRef.offsetWidth + containerSize.offsetLeft,
        )
        posBottom = clamp(
          posBottom,
          containerSize.offsetBottom,
          containerSize.offsetHeight - dragRef.offsetHeight,
        )
        posRight = clamp(
          posRight,
          containerSize.offsetRight,
          containerSize.offsetWidth - dragRef.offsetWidth,
        )

        dragRef.style.boxSizing = 'border-box'
        dragRef.style.position = 'fixed'
        dragRef.style.transition = 'none'
        dragRef.style.pointerEvents = 'none'
        dragRef.style.top = `${Math.floor(posTop)}px`
        dragRef.style.left = `${Math.floor(posLeft)}px`
        dragRef.style.bottom = `${Math.floor(posBottom)}px`
        dragRef.style.right = `${Math.floor(posRight)}px`

        setDragState(
          (prevState): DragState => ({
            ...prevState,
            position: {
              top: posTop,
              left: posLeft,
              bottom: posBottom,
              right: posRight,
            },
          }),
        )
      })
    },
    [
      dragRef,
      dragState.relCursor.relX,
      dragState.relCursor.relY,
      containerSize.offsetWidth,
      containerSize.offsetHeight,
      containerSize.offsetTop,
      containerSize.offsetLeft,
      containerSize.offsetBottom,
      containerSize.offsetRight,
    ],
  )

  const onMouseMoveStart = React.useCallback(
    (event: MouseEvent) => {
      onDragStart?.()

      if (!isDraggable || event.button !== 0) return
      overrideEventDefaults(event)
      onInitRelCursor(event.pageX, event.pageY)
    },
    [isDraggable, onDragStart, onInitRelCursor],
  )

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (!isDraggable || !dragState.isPressing) return
      overrideEventDefaults(event)
      onMoveElement(event.pageX, event.pageY)
    },
    [dragState.isPressing, isDraggable, onMoveElement],
  )

  const onTouchMoveStart = React.useCallback(
    (event: TouchEvent) => {
      onDragStart?.()

      if (!isDraggable) return
      onInitRelCursor(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
    },
    [isDraggable, onDragStart, onInitRelCursor],
  )

  const onTouchMove = React.useCallback(
    (event: TouchEvent) => {
      if (!isDraggable || !dragState.isPressing) return
      onMoveElement(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
    },
    [dragState.isPressing, isDraggable, onMoveElement],
  )

  const onMoveEnd = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (dragState.isPressing)
        setDragState(
          (prevState): DragState => ({
            ...prevState,
            isPressing: false,
          }),
        )

      if (!dragState.isDragging) return
      overrideEventDefaults(event)

      requestAnimationFrame(() => {
        dragRef.style.boxSizing = ''
        dragRef.style.position = ''
        dragRef.style.transition = ''
        dragRef.style.pointerEvents = ''

        setDragState(
          (prevState): DragState => ({
            ...prevState,
            isDragging: false,
          }),
        )
      })
    },
    [dragRef, dragState.isPressing, dragState.isDragging],
  )

  React.useLayoutEffect((): (() => void) => {
    if (dragLayerRef && dragLayerRef.length > 0) {
      dragLayerRef.forEach((element: T | undefined) => {
        if (!element) return
        element.onmousedown = onMouseMoveStart
        element.ontouchstart = onTouchMoveStart
      })
    } else {
      dragRef.onmousedown = onMouseMoveStart
      dragRef.ontouchstart = onTouchMoveStart
    }

    addEventListener('mousemove', onMouseMove)
    addEventListener('mouseup', onMoveEnd)
    addEventListener('touchmove', onTouchMove)
    addEventListener('touchend', onMoveEnd)
    return () => {
      removeEventListener('mousemove', onMouseMove)
      removeEventListener('mouseup', onMoveEnd)
      removeEventListener('touchmove', onTouchMove)
      removeEventListener('touchend', onMoveEnd)
    }
  }, [
    dragRef,
    dragLayerRef,
    onMouseMoveStart,
    onMouseMove,
    onTouchMoveStart,
    onTouchMove,
    onMoveEnd,
  ])

  return { dragState }
}
