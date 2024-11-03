import { getMarkdown } from "actions";
import classNames from "classnames";
import DContainer from "components/d-container";
import DImage from "components/d-image";
import DMarkdown from "components/d-markdown";
import DText from "components/d-text";
import { createProgramFile } from "program-files";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import "./css.css";

const UI = (): JSX.Element => {
  const [isThumbLoaded, setIsThumbLoaded] = useState<boolean>(false);
  const [isFinishIntro, setIsFinishIntro] = useState<boolean>(false);
  const [isFinishIntroDelay, setIsFinishIntroDelay] = useState<boolean>(false);
  const [aboutMeMarkdown, setSkillAboutMeMarkdown] = useState<string>("");

  useEffect((): void => {
    getMarkdown(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown/about-me/about-me.md`).then(
      (response): void => setSkillAboutMeMarkdown(String(response))
    );
  }, []);

  return (
    <DContainer className="about-me-container">
      <section className={classNames("intro", { finish: isFinishIntro })}>
        <DImage
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/my-thumb.png`}
          alt="My Thumb"
          className="my-thumb"
          onLoad={(): void => setIsThumbLoaded(true)}
        />
        {isThumbLoaded && (
          <DText
            texts="Hello there! Welcome to my desktop computer."
            className="greeting"
            onFinish={(isFinish): void => {
              setIsFinishIntro(isFinish);

              setTimeout((): void => setIsFinishIntroDelay(true), 750);
            }}
          />
        )}
      </section>
      {isFinishIntroDelay && aboutMeMarkdown && (
        <DText
          texts={ReactDOMServer.renderToString(<DMarkdown>{String(aboutMeMarkdown)}</DMarkdown>)}
          speed={25}
        />
      )}
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
