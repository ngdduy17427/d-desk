import { DButton } from 'components/d-button'
import { DContainer } from 'components/d-container'
import { createProgramFile } from 'program-files'
import { MarkdownProgram } from 'program-files/markdown'
import { OneAMProgram } from 'program-files/one-am'
import { useStore } from 'store'
import { uniqueId } from 'utils/utils-helper'
import './css.css'
import { ProjectCard } from './ui/project-card'

type Tech = {
  id: string
  name: string
  link: string
}

type TechConfig = Omit<Tech, 'id'> & {
  id?: string
}

const createTech = (config: TechConfig): Tech => ({
  id: uniqueId(),
  ...config,
})

export const techList: Array<Tech> = [
  createTech({
    name: 'React',
    link: 'https://react.dev/',
  }),
  createTech({
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
  }),
  createTech({
    name: 'Next.js',
    link: 'https://nextjs.org/',
  }),
  createTech({
    name: 'Node.js',
    link: 'https://nodejs.org',
  }),
  createTech({
    name: 'WebSocket',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
  }),
]

export type Project = {
  id?: string
  name: string
  description: string
  techs: Array<string>
  thumbnail: string
  BtnView?: () => React.ReactNode
}

const createProject = (config: Project): Project => ({
  id: uniqueId(),
  ...config,
})

const projectList: Array<Project> = [
  createProject({
    name: 'D-Desk',
    description:
      'A customizable workspace, which allows to organize digital tasks, notes, and projects in a way that suits their individual preferences and workflow.',
    techs: [techList[0].id, techList[1].id, techList[2].id],
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/d-desk-thumb.png`,
    BtnView: () => {
      return <DButton disabled>You are here</DButton>
    },
  }),
  createProject({
    name: '1AM',
    description: 'An online chat game with character.',
    techs: [techList[1].id, techList[3].id, techList[4].id],
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/1am-thumb.png`,
    BtnView: () => {
      const runProgram = useStore((store) => store.appStore.runProgram)
      return <DButton onClick={() => runProgram(OneAMProgram)}>Launch</DButton>
    },
  }),
  createProject({
    name: 'Laguz',
    description: 'A lightweight, proxy-based state management library for React.',
    techs: [techList[0].id, techList[1].id],
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/laguz-thumb.png`,
    BtnView: () => {
      const runProgram = useStore((store) => store.appStore.runProgram)
      return (
        <DButton
          onClick={() =>
            runProgram(
              MarkdownProgram('Laguz', `${process.env.NEXT_PUBLIC_BASE_URL}/markdown/laguz.md`),
            )
          }
        >
          More info
        </DButton>
      )
    },
  }),
]

const UI = () => {
  return (
    <DContainer className='projects-container'>
      {projectList.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </DContainer>
  )
}

export const ProjectsProgram = createProgramFile({
  name: 'Projects',
  component: UI,
  windowState: {
    width: 1000,
    height: 602,
  },
})
