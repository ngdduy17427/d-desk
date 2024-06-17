import DContainer from "components/d_container";
import { createProgramFile } from "program_files";
import { uuidv4 } from "utils/utils_helper";
import "./css.css";
import ProjectCard from "./ui/project_card";

interface ITech {
  id?: string;
  name: string;
  link: string;
}

const createTech = ({ name, link }: ITech): ITech => ({
  id: uuidv4(),
  name,
  link,
});

export const techList: Array<ITech> = [
  createTech({
    name: "React",
    link: "https://react.dev/",
  }),
  createTech({
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
  }),
  createTech({
    name: "Next.js",
    link: "https://nextjs.org/",
  }),
  createTech({
    name: "Node.js",
    link: "https://nodejs.org",
  }),
  createTech({
    name: "WebSocket",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  }),
];

export interface IProject {
  id?: string;
  name: string;
  description: string;
  techs: Array<string>;
  thumnnail: string;
  link?: string;
  linkGit?: string;
  linkNPM?: string;
}
const createProject = ({
  name,
  description,
  techs,
  thumnnail,
  link,
  linkGit,
  linkNPM,
}: IProject): IProject => ({
  id: uuidv4(),
  name,
  description,
  techs,
  thumnnail,
  link,
  linkGit,
  linkNPM,
});

const projectList: Array<IProject> = [
  createProject({
    name: "D-Desk",
    description:
      "A customizable workspace, which allows to organize digital tasks, notes, and projects in a way that suits their individual preferences and workflow.",
    techs: [String(techList[0].id), String(techList[1].id), String(techList[2].id)],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/d_desk_thumb.png`,
  }),
  createProject({
    name: "1AM 🌕",
    description: "An online chat game with character.",
    techs: [String(techList[1].id), String(techList[3].id), String(techList[4].id)],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/1am_thumb.png`,
  }),
  createProject({
    name: "D-Store",
    description:
      "An online shopping destination that offers a diverse range of products to cater to various consumer needs.",
    techs: [String(techList[0].id), String(techList[1].id), String(techList[2].id)],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/d_store_thumb.png`,
    link: "https://d-store-ssr.vercel.app/",
    linkGit: "https://github.com/ngdduy17427/d-store-ssr",
  }),
];

const UI = (): JSX.Element => {
  return (
    <DContainer className="projects-container">
      {projectList?.map(
        (project): JSX.Element => <ProjectCard key={project.id} project={project} />
      )}
    </DContainer>
  );
};

const ProjectsProgram = createProgramFile({
  name: "Projects",
  component: UI,
  windowState: {
    width: 1000,
    height: 600,
  },
});

export default ProjectsProgram;
