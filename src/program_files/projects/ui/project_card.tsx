import { FaGithub, FaNpm } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { IProject, techList } from "..";

const ProjectCard = ({ project }: { project: IProject }) => (
  <article className="project-card">
    <img src={project.thumnnail} alt="Project thumbnail" className="project-thumb" />
    <h1 className="project-name">
      <strong>{project.title}</strong>
    </h1>
    <p className="project-description">{project.description}</p>
    <div className="project-techs">
      {project.techs?.map((techId: string) => {
        const tech = techList?.filter((tech) => tech.id === techId)[0];

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
