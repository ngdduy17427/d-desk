import DImage from "components/d_image";
import DText from "components/d_text";
import { FaGithub, FaNpm } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { IProject, techList } from "..";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectCardProps): JSX.Element => (
  <article className="project-card">
    <DImage src={project.thumnnail} alt="Project thumbnail" className="project-thumb" />
    <h1 className="project-name">
      <strong>{project.name}</strong>
    </h1>
    <DText texts={project.description} className="project-description" />
    <div className="project-techs">
      {project.techs?.map((techId: string): JSX.Element => {
        const tech = techList?.filter((tech): boolean => tech.id === techId)[0];

        return (
          <a key={tech.id} href={tech.link} target="_blank" rel="noreferrer">
            {tech.name}
          </a>
        );
      })}
    </div>
    <div className="project-links">
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
          <MdOpenInNew />
        </a>
      )}
      {project.linkGit && (
        <a href={project.linkGit} target="_blank" rel="noreferrer" className="project-link">
          <FaGithub />
        </a>
      )}
      {project.linkNPM && (
        <a href={project.linkNPM} target="_blank" rel="noreferrer" className="project-link">
          <FaNpm className="!text-[2rem]" />
        </a>
      )}
    </div>
  </article>
);

export default ProjectCard;
