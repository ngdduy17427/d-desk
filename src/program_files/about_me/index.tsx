import { getMarkdown } from "actions";
import DContainer from "components/d_container";
import DMarkdown from "components/d_markdown";
import { createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.css";
import Intro from "./ui/intro";

const UI = (): JSX.Element => {
  const [aboutMeMarkdown, setSkillAboutMeMarkdown] = useState("");

  useEffect((): void => {
    getMarkdown(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown/about_me/about_me.md`).then(
      (response) => setSkillAboutMeMarkdown(String(response))
    );
  }, []);

  return (
    <DContainer className="about-me-container">
      <Intro />
      <DMarkdown>{String(aboutMeMarkdown)}</DMarkdown>
    </DContainer>
  );
};

const AboutMeProgram = createProgramFile({
  name: "About Me",
  component: UI,
  windowState: {
    width: 800,
    height: 535,
  },
});

export default AboutMeProgram;
