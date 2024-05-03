import classNames from "classnames";
import DContainer from "components/d_container";
import DIcon from "components/d_icon";
import DText from "components/d_text";
import { withContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import { useState } from "react";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import { uuidv4 } from "utils/utils_helper";
import "./css.css";

interface IContactUIProps {
  windowApp: IProgramFile;
}

interface IContact {
  id?: string;
  icon: JSX.Element;
  link: string;
}

const createContact = ({ icon, link }: IContact): IContact => ({
  id: uuidv4(),
  icon,
  link,
});

const contactList: IContact[] = [
  createContact({
    icon: <SiGmail color="#d5463a" />,
    link: "mailto:ngdduy17427@gmail.com",
  }),
  createContact({
    icon: <SiGithub />,
    link: "https://github.com/ngdduy17427",
  }),
  createContact({
    icon: <SiLinkedin color="#0a66c2" />,
    link: "https://www.linkedin.com/in/ngdduy17427",
  }),
];

const UI = withContext(({ windowApp }: IContactUIProps): JSX.Element => {
  const [isFinishText, setIsFinishText] = useState<boolean>(false);
  const [isFinishTextDelay, setIsFinishTextDelay] = useState<boolean>(false);

  return (
    <DContainer className="contact-container">
      <section className="contact-content">
        <DText
          texts="If you are interested please contact me at:"
          className={classNames("intro", { finish: isFinishText })}
          onFinish={(isFinish): void => {
            setIsFinishText(isFinish);

            setTimeout((): void => setIsFinishTextDelay(isFinish), 500);
          }}
        />
        {isFinishTextDelay && (
          <div className="contacts">
            {contactList.map(
              (contact): JSX.Element => (
                <DIcon
                  key={contact.id}
                  className="contact-icon"
                  windowSizing={windowApp.windowState?.sizing}
                >
                  <a href={contact.link} target="_blank" rel="noreferrer">
                    {contact.icon}
                  </a>
                </DIcon>
              )
            )}
          </div>
        )}
      </section>
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
