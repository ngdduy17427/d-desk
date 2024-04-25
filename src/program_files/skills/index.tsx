import { getMarkdown } from "actions";
import classNames from "classnames";
import DContainer from "components/d_container";
import DIcon from "components/d_icon";
import Markdown from "components/d_markdown";
import { withContext } from "context/context";
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
import { uuidv4 } from "utils/utils_helper";
import "./css.css";
import SkillNav from "./ui/skill_nav";

const programFileName = "Skills";

interface ISkillsUIProps {
  windowApp: IProgramFile;
}

interface ISkill {
  id?: string;
  name: string;
  icon: JSX.Element;
  markdown: string;
}

const createSkill = (config: ISkill): ISkill => ({
  id: uuidv4(),
  name: config.name,
  icon: config.icon,
  markdown: config.markdown,
});

const skillList: ISkill[] = [
  createSkill({
    name: "HTML5",
    icon: <IoLogoHtml5 color="#e44d26" />,
    markdown: "/skills/html5.md",
  }),
  createSkill({
    name: "CSS3",
    icon: <IoLogoCss3 color="#379ad6" />,
    markdown: "/skills/css3.md",
  }),
  createSkill({
    name: "JavaScript",
    icon: <SiJavascript color="#f2de48" />,
    markdown: "/skills/javascript.md",
  }),
  createSkill({
    name: "TypeScript",
    icon: <SiTypescript color="#2f74c0" />,
    markdown: "/skills/typescript.md",
  }),
  createSkill({
    name: "React",
    icon: <SiReact color="#61dafb" />,
    markdown: "/skills/react.md",
  }),
  createSkill({
    name: "Next.js",
    icon: <TbBrandNextjs color="#000" />,
    markdown: "/skills/nextjs.md",
  }),
  createSkill({
    name: "Electron",
    icon: <IoLogoElectron color="#61dafb" />,
    markdown: "/skills/electron.md",
  }),
  createSkill({
    name: "Node.js",
    icon: <IoLogoNodejs color="#90c53f" />,
    markdown: "/skills/nodejs.md",
  }),
  createSkill({
    name: "Express.js",
    icon: <SiExpress color="#000" />,
    markdown: "/skills/expressjs.md",
  }),
  createSkill({
    name: "MySQL",
    icon: <SiMysql color="#136494" />,
    markdown: "/skills/mysql.md",
  }),
  createSkill({
    name: "MongoDB",
    icon: <SiMongodb color="#4faa41" />,
    markdown: "/skills/mongodb.md",
  }),
  createSkill({
    name: "WebSocket",
    icon: <SiSocketdotio color="#000" />,
    markdown: "/skills/websocket.md",
  }),
];

const UI = withContext(({ windowApp }: ISkillsUIProps): JSX.Element => {
  const [selectedSkill, setSelectedSkill] = useState<ISkill | undefined>(undefined);
  const [skillMarkdown, setSkillMarkdown] = useState<string>("");

  const updateWindowTitle = useCallback(
    (title: string | undefined): void => {
      const window = document.getElementById(String(windowApp.id));
      const windowTitle = (window as HTMLElement).getElementsByClassName("window-name")[0];

      if (title) windowTitle.innerHTML = `${windowTitle.innerHTML} - ${selectedSkill?.name}`;
      else windowTitle.innerHTML = programFileName;
    },
    [windowApp.id, selectedSkill?.name]
  );

  const handleGoBack = (): void => {
    updateWindowTitle(undefined);
    setSelectedSkill(undefined);
    setSkillMarkdown("");
  };

  useEffect((): void => {
    if (!selectedSkill) return;

    getMarkdown(selectedSkill?.markdown).then((response): void => {
      updateWindowTitle(selectedSkill?.name);
      setSkillMarkdown(String(response));
    });
  }, [updateWindowTitle, selectedSkill]);

  return (
    <DContainer className="skills-container">
      <DContainer className="icons-container">
        {skillList.map(
          ({ id, icon }): JSX.Element => (
            <DIcon key={id} className="icon" windowSizing={windowApp.windowState.sizing}>
              {icon}
            </DIcon>
          )
        )}
      </DContainer>
      <aside id="skillsAside" className={classNames("skills-aside", { show: selectedSkill })}>
        <DContainer className="skill-aside-container">
          <SkillNav handleGoBack={handleGoBack} />
          <Markdown>{String(skillMarkdown)}</Markdown>
        </DContainer>
      </aside>
    </DContainer>
  );
});

const SkillsProgram = createProgramFile({
  name: programFileName,
  component: UI,
  windowState: {
    width: 800,
    height: 600,
  },
});

export default SkillsProgram;
