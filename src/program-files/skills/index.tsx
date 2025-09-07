import classNames from 'classnames'
import { DContainer } from 'components/d-container'
import { DMarkdown } from 'components/d-markdown'
import { DPerspectiveIcon } from 'components/d-perspective-icon'
import { ProgramFile, createProgramFile } from 'program-files'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { IoLogoCss3, IoLogoElectron, IoLogoHtml5, IoLogoNodejs } from 'react-icons/io5'
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiReact,
  SiSocketdotio,
  SiTypescript,
} from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import { uniqueId } from 'utils/utils-helper'
import './css.css'
import { SkillNav } from './ui/skill-nav'

const programFileName = 'Skills'

type Skill = {
  id: string
  name: string
  icon: ReactNode
  markdown: string
}

type SillConfig = Omit<Skill, 'id'> & { id?: string }

const createSkill = (config: SillConfig): Skill => ({
  id: uniqueId(),
  name: config.name,
  icon: config.icon,
  markdown: config.markdown,
})

const skillList: Array<Skill> = [
  createSkill({
    name: 'HTML5',
    icon: <IoLogoHtml5 color='#e44d26' />,
    markdown: '/skills/html5.md',
  }),
  createSkill({
    name: 'CSS3',
    icon: <IoLogoCss3 color='#379ad6' />,
    markdown: '/skills/css3.md',
  }),
  createSkill({
    name: 'JavaScript',
    icon: <SiJavascript color='#f2de48' />,
    markdown: '/skills/javascript.md',
  }),
  createSkill({
    name: 'TypeScript',
    icon: <SiTypescript color='#2f74c0' />,
    markdown: '/skills/typescript.md',
  }),
  createSkill({
    name: 'React',
    icon: <SiReact color='#61dafb' />,
    markdown: '/skills/react.md',
  }),
  createSkill({
    name: 'Next.js',
    icon: <TbBrandNextjs color='#000' />,
    markdown: '/skills/nextjs.md',
  }),
  createSkill({
    name: 'Electron',
    icon: <IoLogoElectron color='#61dafb' />,
    markdown: '/skills/electron.md',
  }),
  createSkill({
    name: 'Node.js',
    icon: <IoLogoNodejs color='#90c53f' />,
    markdown: '/skills/nodejs.md',
  }),
  createSkill({
    name: 'Express.js',
    icon: <SiExpress color='#000' />,
    markdown: '/skills/expressjs.md',
  }),
  createSkill({
    name: 'MySQL',
    icon: <SiMysql color='#136494' />,
    markdown: '/skills/mysql.md',
  }),
  createSkill({
    name: 'MongoDB',
    icon: <SiMongodb color='#4faa41' />,
    markdown: '/skills/mongodb.md',
  }),
  createSkill({
    name: 'WebSocket',
    icon: <SiSocketdotio color='#000' />,
    markdown: '/skills/websocket.md',
  }),
]

const UI = ({ id, windowState }: ProgramFile) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>(undefined)
  const [skillMarkdown, setSkillMarkdown] = useState('')

  const updateWindowTitle = useCallback(
    (title: string | undefined) => {
      const window = document.getElementById(id)
      const windowTitle = window?.getElementsByClassName('window-name')[0]

      if (title) {
        ;(windowTitle as HTMLElement).innerHTML =
          `${(windowTitle as HTMLElement).innerHTML} - ${selectedSkill?.name}`
      } else {
        ;(windowTitle as HTMLElement).innerHTML = programFileName
      }
    },
    [id, selectedSkill?.name],
  )

  const handleGoBack = () => {
    updateWindowTitle(undefined)
    setSelectedSkill(undefined)
    setSkillMarkdown('')
  }

  useEffect(() => {
    if (!selectedSkill) return

    fetch(selectedSkill.markdown, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((response) => response.text())
      .then((response) => {
        updateWindowTitle(selectedSkill.name)
        setSkillMarkdown(String(response))
      })
  }, [updateWindowTitle, selectedSkill])

  return (
    <DContainer className='skills-container'>
      <DContainer className='icons-container'>
        {skillList.map(({ id, icon }) => (
          <DPerspectiveIcon
            key={id}
            className='icon'
            windowSizing={windowState.sizing}
          >
            {icon}
          </DPerspectiveIcon>
        ))}
      </DContainer>
      <aside
        id='skillsAside'
        className={classNames('skills-aside', { show: selectedSkill })}
      >
        <DContainer className='skill-aside-container'>
          <SkillNav handleGoBack={handleGoBack} />
          <DMarkdown>{String(skillMarkdown)}</DMarkdown>
        </DContainer>
      </aside>
    </DContainer>
  )
}

export const SkillsProgram = createProgramFile({
  name: programFileName,
  component: UI,
  windowState: {
    width: 800,
    height: 600,
  },
})
