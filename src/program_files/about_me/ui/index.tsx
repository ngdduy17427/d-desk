import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import AboutMeMD from "./about_me.md";
import "./index.scss";

const AboutMeUI = () => {
  const [markdownData, setMarkdownData] = useState<string>("");

  useEffect(() => {
    fetch(AboutMeMD)
      .then(async (response) => await response.text())
      .then(async (response) => setMarkdownData(response));
  });

  return (
    <div className="about-me">
      <Markdown className="markdown-body">{markdownData}</Markdown>
    </div>
  );
};

export default AboutMeUI;
