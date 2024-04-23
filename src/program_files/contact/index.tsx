import DContainer from "components/d_container";
import DIcon from "components/d_icon";
import { withContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import "./css.css";

interface IContactUIProps {
  windowApp: IProgramFile;
}

const UI = withContext(({ windowApp }: IContactUIProps): JSX.Element => {
  return (
    <DContainer className="contact-container">
      <h1 className="text-center text-[1rem]">
        <strong>If you are interested please contact me at:</strong>
      </h1>
      <div className="contacts">
        <DIcon className="contact-icon" windowSizing={windowApp.windowState.sizing}>
          <a href="mailto:ngdduy17427@gmail.com">
            <SiGmail color="#d5463a" />
          </a>
        </DIcon>
        <DIcon className="contact-icon" windowSizing={windowApp.windowState.sizing}>
          <a href="https://github.com/ngdduy17427" target="_blank" rel="noreferrer">
            <SiGithub />
          </a>
        </DIcon>
        <DIcon className="contact-icon" windowSizing={windowApp.windowState.sizing}>
          <a href="https://www.linkedin.com/in/ngdduy17427" target="_blank" rel="noreferrer">
            <SiLinkedin color="#0a66c2" />
          </a>
        </DIcon>
      </div>
    </DContainer>
  );
});

const ContactProgram = createProgramFile({
  name: "Contact",
  component: UI,
  windowState: {
    width: 500,
    height: 200,
  },
});

export default ContactProgram;
