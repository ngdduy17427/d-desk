import { createProgramFile } from "program_files";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import "./css.scss";

const UI = () => {
  return (
    <section className="contact-ui">
      <container className="contact-container">
        <h1 className="text-center text-[1rem]">
          <strong>If you are interested please contact me at:</strong>
        </h1>
        <div className="contacts">
          <a href="mailto:ngdduy17427@gmail.com">
            <SiGmail color="#d5463a" />
          </a>
          <a href="https://github.com/ngdduy17427" target="_blank" rel="noreferrer">
            <SiGithub />
          </a>
          <a href="https://www.linkedin.com/in/ngdduy17427" target="_blank" rel="noreferrer">
            <SiLinkedin color="#0a66c2" />
          </a>
        </div>
      </container>
    </section>
  );
};

const ContactProgram = createProgramFile({
  component: UI,
  name: "Contact",
  width: 500,
  height: 200,
});

export default ContactProgram;
