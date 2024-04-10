import Markdown from "components/markdown/markdown";
import { createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.scss";

const UI = () => {
  const [aboutMeMarkdown, setSkillAboutMeMarkdown] = useState<string>("");

  useEffect(() => {
    fetch("markdown/about_me/about_me.md", { cache: "force-cache" })
      .then((response) => response.text())
      .then((response) => setSkillAboutMeMarkdown(response));
  }, []);

  return (
    <section className="about-me-ui">
      <container className="about-me-container">
        <img src="/images/thumb/my-thumb.png" alt="My Thumb" className="my-thumb" />
        <Markdown className="markdown-body">{String(aboutMeMarkdown)}</Markdown>
      </container>
    </section>
  );
};

const AboutMeProgram = createProgramFile({
  component: UI,
  name: "About Me",
  width: 700,
  height: 500,
});

export default AboutMeProgram;
