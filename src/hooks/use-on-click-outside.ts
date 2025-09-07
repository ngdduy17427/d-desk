import React from 'react'

export const useOnClickOutside = <T extends HTMLElement>(
  refs: Array<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  React.useEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      let isContain = false
      const listSize = refs.length

      for (let i = 0; i < listSize; i++)
        if ((<T>refs[i]).contains(<Node>event.target)) isContain = true

      if (!isContain) handler(event)
    }

    addEventListener('mousedown', handleClickOutside)
    addEventListener('touchstart', handleClickOutside)
    return () => {
      removeEventListener('mousedown', handleClickOutside)
      removeEventListener('touchstart', handleClickOutside)
    }
  }, [refs, handler])
}
