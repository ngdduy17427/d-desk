import React from 'react'

export type TTexts = string | Array<string>

type TypingEffect = {
  isFinish: boolean
}

export const useTypingEffect = <T extends React.RefObject<HTMLElement | null>>(
  texts: TTexts,
  element?: T,
  speed: number = 50,
): TypingEffect => {
  const [isFinishTypeAnimation, setIsFinishTypeAnimation] = React.useState(false)
  const [isFinish, setIsFinish] = React.useState(false)

  const doTypeAnimation = React.useCallback(
    async (texts: string, parent: HTMLElement): Promise<void> => {
      setIsFinishTypeAnimation(false)
      let textsLength = texts.length
      for (const char of texts)
        await new Promise(
          (resolve): NodeJS.Timeout =>
            setTimeout(() => {
              if (!--textsLength) setIsFinishTypeAnimation(true)
              resolve((parent.innerHTML += char))
            }, speed),
        )
    },
    [speed],
  )

  const doCreateNode = React.useCallback(
    async (texts: string, parent: HTMLElement): Promise<void> => {
      const textsDoc = new DOMParser().parseFromString(texts, 'text/html')
      let textsDocLength = textsDoc.body.childNodes.length

      for await (const childNode of textsDoc.body.childNodes) {
        if (!--textsDocLength) setIsFinish(true)

        const deepElement = <HTMLElement>childNode.cloneNode(true)
        const shallowElement = <HTMLElement>childNode.cloneNode(false)

        if (deepElement.nodeName === '#text') {
          await doTypeAnimation(String(deepElement.nodeValue), parent)
        } else {
          parent.appendChild(shallowElement)
          await doCreateNode(deepElement.innerHTML, shallowElement)
        }
      }
    },
    [doTypeAnimation],
  )

  React.useEffect(() => {
    if (typeof texts !== 'string' || !element || !element.current) return
    doCreateNode(texts, element.current)
  }, [doCreateNode, element, texts])

  return { isFinish: isFinishTypeAnimation && isFinish }
}
