import classNames from "classnames";
import { IProgramFile, createProgramFile } from "program_files";
import { useCallback, useEffect, useState } from "react";
import { IoLogoCss3, IoLogoElectron, IoLogoHtml5, IoLogoNodejs } from "react-icons/io5";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiReact,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { uuidv4 } from "utils/utils_helper";
import "./css.scss";
import SkillNav from "./ui/skill_nav";

const programFileName = "Skills";

interface ISkill {
  id?: string;
  name: string;
  icon: JSX.Element;
  markdown: string;
}

const createSkill = (config: ISkill) => ({
  id: uuidv4(),
  name: config.name,
  icon: config.icon,
  markdown: config.markdown,
});

const skills = [
  createSkill({
    name: "HTML5",
    icon: <IoLogoHtml5 color="#e44d26" />,
    markdown: "markdown/html5.md",
  }),
  createSkill({
    name: "CSS3",
    icon: <IoLogoCss3 color="#379ad6" />,
    markdown: "markdown/css3.md",
  }),
  createSkill({
    name: "JavaScript",
    icon: <SiJavascript color="#f2de48" />,
    markdown: "markdown/javascript.md",
  }),
  createSkill({
    name: "TypeScript",
    icon: <SiTypescript color="#2f74c0" />,
    markdown: "markdown/typescript.md",
  }),
  createSkill({
    name: "React",
    icon: <SiReact color="#61dafb" />,
    markdown: "markdown/react.md",
  }),
  createSkill({
    name: "Next.js",
    icon: <TbBrandNextjs color="#000" />,
    markdown: "markdown/nextjs.md",
  }),
  createSkill({
    name: "Electron",
    icon: <IoLogoElectron color="#61dafb" />,
    markdown: "markdown/electron.md",
  }),
  createSkill({
    name: "Node.js",
    icon: <IoLogoNodejs color="#90c53f" />,
    markdown: "markdown/nodejs.md",
  }),
  createSkill({
    name: "Express.js",
    icon: <SiExpress color="#000" />,
    markdown: "markdown/expressjs.md",
  }),
  createSkill({
    name: "MySQL",
    icon: <SiMysql color="#136494" />,
    markdown: "markdown/mysql.md",
  }),
  createSkill({
    name: "MongoDB",
    icon: <SiMongodb color="#4faa41" />,
    markdown: "markdown/mongodb.md",
  }),
  createSkill({
    name: "WebSocket",
    icon: <SiSocketdotio color="#000" />,
    markdown: "markdown/websocket.md",
  }),
];

const UI = ({ windowsApp }: { windowsApp: IProgramFile }) => {
  const [selectedSkill, setSelectedSkill] = useState<ISkill | undefined>(undefined);
  const [skillMarkdown, setSkillMarkdown] = useState<string | undefined>(undefined);

  const updateWindowsTitle = useCallback(
    (title: string | undefined) => {
      const windows = document.getElementById(windowsApp.id as string);
      const windowsTitle = (windows as HTMLElement).getElementsByClassName("windows-name")[0];

      if (title) windowsTitle.innerHTML = `${windowsTitle.innerHTML} - ${selectedSkill?.name}`;
      else windowsTitle.innerHTML = programFileName;
    },
    [windowsApp.id, selectedSkill?.name]
  );

  const handleGoBack = () => {
    updateWindowsTitle(undefined);
    setSelectedSkill(undefined);
    setSkillMarkdown(undefined);
  };

  useEffect(() => {
    if (!selectedSkill) return;

    updateWindowsTitle(selectedSkill?.name);

    fetch(selectedSkill?.markdown as string)
      .then((response) => response.text())
      .then((response) => setSkillMarkdown(response));
  }, [updateWindowsTitle, selectedSkill]);

  return (
    <section className="skills-ui">
      <container className="skills-container">
        {skills.map(({ id, name, icon, markdown }) => {
          return (
            <span
              key={id}
              className="skill-icon"
              onClick={() => setSelectedSkill({ id, name, icon, markdown })}
            >
              {icon}
            </span>
          );
        })}
      </container>
      <div id="skillsComponent" className={classNames("skills-component", { show: selectedSkill })}>
        <container className="skill-content">
          <SkillNav handleGoBack={handleGoBack} />
          <Markdown
            className="markdown-body"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {skillMarkdown}
          </Markdown>
        </container>
      </div>
    </section>
  );
};

const SkillsProgram = createProgramFile({
  component: UI,
  name: programFileName,
  width: 800,
  height: 600,
});

export default SkillsProgram;
