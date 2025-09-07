import { DImage } from 'components/d-image'
import { DTypingText } from 'components/d-typing-text'
import { Project, techList } from '..'

type ProjectCardProps = {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className='project-card'>
    <DImage
      src={project.thumbnail}
      alt='Project thumbnail'
      className='project-thumb'
    />
    <h1 className='project-name'>
      <strong>{project.name}</strong>
    </h1>
    <DTypingText
      texts={project.description}
      className='project-description'
    />
    <div className='project-techs'>
      {project.techs.map((techId: string) => {
        const tech = techList.filter((tech): boolean => tech.id === techId)[0]

        return (
          <a
            key={tech.id}
            href={tech.link}
            target='_blank'
            rel='noreferrer'
          >
            {tech.name}
          </a>
        )
      })}
    </div>
    {project.BtnView && <project.BtnView />}
  </article>
)
