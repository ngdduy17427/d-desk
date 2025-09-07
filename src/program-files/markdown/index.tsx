import { DContainer } from 'components/d-container'
import { DMarkdown } from 'components/d-markdown'
import { createProgramFile, ProgramFile } from 'program-files'
import { useEffect, useState } from 'react'
import './css.css'

const UI = (props: ProgramFile) => {
  const [aboutMeMarkdown, setSkillAboutMeMarkdown] = useState('')

  useEffect(() => {
    fetch(props.windowProps?.mdUrl, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((response) => response.text())
      .then((response) => setSkillAboutMeMarkdown(String(response)))
  }, [props.windowProps?.mdUrl])

  return (
    <DContainer className='markdown-container'>
      <DMarkdown>{String(aboutMeMarkdown)}</DMarkdown>
    </DContainer>
  )
}

export const MarkdownProgram = (name = 'Markdown', mdUrl = '') =>
  createProgramFile({
    name: name,
    component: UI,
    windowState: {
      width: 800,
      height: 535,
    },
    windowProps: {
      mdUrl,
    },
  })
