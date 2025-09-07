import classNames from 'classnames'
import { DContainer } from 'components/d-container'
import { DImage } from 'components/d-image'
import { DMarkdown } from 'components/d-markdown'
import { DTypingText } from 'components/d-typing-text'
import { createProgramFile } from 'program-files'
import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import './css.css'

const UI = () => {
  const [isThumbLoaded, setIsThumbLoaded] = useState(false)
  const [isFinishIntro, setIsFinishIntro] = useState(false)
  const [isFinishIntroDelay, setIsFinishIntroDelay] = useState(false)
  const [aboutMeMarkdown, setSkillAboutMeMarkdown] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown/about-me.md`, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((response) => response.text())
      .then((response) => setSkillAboutMeMarkdown(String(response)))
  }, [])

  return (
    <DContainer className='about-me-container'>
      <section className={classNames('intro', { finish: isFinishIntro })}>
        <DImage
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/my-thumb.png`}
          alt='My Thumb'
          className='my-thumb'
          onLoad={() => setIsThumbLoaded(true)}
        />
        {isThumbLoaded && (
          <DTypingText
            texts='Hello there! Welcome to my desktop computer.'
            className='greeting'
            onFinish={(isFinish) => {
              setIsFinishIntro(isFinish)

              setTimeout(() => setIsFinishIntroDelay(true), 750)
            }}
          />
        )}
      </section>
      {isFinishIntroDelay && aboutMeMarkdown && (
        <DTypingText
          texts={ReactDOMServer.renderToString(<DMarkdown>{String(aboutMeMarkdown)}</DMarkdown>)}
          speed={25}
        />
      )}
    </DContainer>
  )
}

export const AboutMeProgram = createProgramFile({
  name: 'About Me',
  component: UI,
  windowState: {
    width: 800,
    height: 535,
  },
})
