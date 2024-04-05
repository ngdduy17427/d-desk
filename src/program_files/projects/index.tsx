import { createProgramFile } from "program_files";
import { uuidv4 } from "utils/utils_helper";
import "./css.scss";
import ProjectCard from "./ui/project_card";

export interface IProject {
  id: string;
  title: string;
  description: string;
  techs: string[];
  thumnnail: string;
  link?: string;
  linkGit?: string;
  linkNPM?: string;
}

export const techList: {
  id: string;
  name: string;
  link: string;
}[] = [
  {
    id: uuidv4(),
    name: "React",
    link: "https://react.dev/",
  },
  {
    id: uuidv4(),
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: uuidv4(),
    name: "Next.js",
    link: "https://nextjs.org/",
  },
  {
    id: uuidv4(),
    name: "Electron",
    link: "https://www.electronjs.org/",
  },
];

const projectList: IProject[] = [
  {
    id: uuidv4(),
    title: "D-Desk",
    description:
      "A customizable workspace, which allows to organize digital tasks, notes, and projects in a way that suits their individual preferences and workflow.",
    techs: [techList[0].id, techList[1].id],
    thumnnail: "/images/thumb/d-desk-thumb.png",
  },
  {
    id: uuidv4(),
    title: "D-Store",
    description:
      "An online shopping destination that offers a diverse range of products to cater to various consumer needs.",
    techs: [techList[0].id, techList[1].id, techList[2].id],
    thumnnail: "/images/thumb/d-store-thumb.png",
    link: "https://d-store-ssr.vercel.app/",
    linkGit: "https://github.com/ngdduy17427/d-store-ssr",
  },
  {
    id: uuidv4(),
    title: "D-POS",
    description:
      "A POS System Software can be used as Restaurant Table App, Restaurant Online Order.",
    techs: [techList[0].id, techList[1].id, techList[3].id],
    thumnnail: "/images/thumb/d-pos-thumb.png",
    link: "https://drive.google.com/file/d/1-W5bB_AtaYibcxPTPmjZCnyteZjkc2IO/view?usp=sharing",
    linkGit: "https://github.com/ngdduy17427/d-pos",
  },
  {
    id: uuidv4(),
    title: "cra-template-retypewind",
    description: "Based Typescript template for React application.",
    techs: [techList[0].id, techList[1].id],
    thumnnail: "/images/thumb/retypewind-thumb.png",
    linkNPM: "https://www.npmjs.com/package/cra-template-retypewind",
    linkGit: "https://github.com/ngdduy17427/cra-template-retypewind",
  },
  {
    id: uuidv4(),
    title: "cra-template-retypetron",
    description: "Based Typescript template for React Electron application.",
    techs: [techList[0].id, techList[1].id, techList[3].id],
    thumnnail: "/images/thumb/retypetron-thumb.png",
    linkNPM: "https://www.npmjs.com/package/cra-template-retypetron",
    linkGit: "https://github.com/ngdduy17427/cra-template-retypetron",
  },
];

const UI = () => {
  return (
    <section className="projects-ui">
      <container className="projects-container">
        {projectList?.map((project) => <ProjectCard key={project.id} project={project} />)}
      </container>
    </section>
  );
};

const ProjectsProgram = createProgramFile({
  component: UI,
  name: "Projects",
  width: 1000,
  height: 600,
});

export default ProjectsProgram;
