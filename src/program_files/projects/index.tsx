import DContainer from "components/d_container";
import { createProgramFile } from "program_files";
import { uuidv4 } from "utils/utils_helper";
import "./css.css";
import ProjectCard from "./ui/project_card";

export interface IProject {
  id?: string;
  name: string;
  description: string;
  techs: string[];
  thumnnail: string;
  link?: string;
  linkGit?: string;
  linkNPM?: string;
}

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

export const techList: ITech[] = [
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
    name: "Electron",
    link: "https://www.electronjs.org/",
  }),
];

const projectList: IProject[] = [
  createProject({
    name: "D-Desk",
    description:
      "A customizable workspace, which allows to organize digital tasks, notes, and projects in a way that suits their individual preferences and workflow.",
    techs: [techList[0].id, techList[1].id],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getImage?image=/thumb/d_desk_thumb.png`,
  }),
  createProject({
    name: "D-Store",
    description:
      "An online shopping destination that offers a diverse range of products to cater to various consumer needs.",
    techs: [techList[0].id, techList[1].id, techList[2].id],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getImage?image=/thumb/d_store_thumb.png`,
    link: "https://d-store-ssr.vercel.app/",
    linkGit: "https://github.com/ngdduy17427/d-store-ssr",
  }),
  createProject({
    name: "D-POS",
    description: "A POS Software can be used as Restaurant Table App, Restaurant Online Order.",
    techs: [techList[0].id, techList[1].id, techList[3].id],
    thumnnail: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getImage?image=/thumb/d_pos_thumb.png`,
    link: "https://drive.google.com/file/d/1-W5bB_AtaYibcxPTPmjZCnyteZjkc2IO/view?usp=sharing",
    linkGit: "https://github.com/ngdduy17427/d-pos",
  }),
];

const UI = (): JSX.Element => {
  return (
    <DContainer className="projects-container">
      {projectList?.map((project) => <ProjectCard key={project.id} project={project} />)}
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
