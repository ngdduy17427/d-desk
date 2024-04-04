import { createProgramFile } from "program_files";
import "./css.scss";

const UI = () => {
  return (
    <section className="about-me-ui">
      <img src="/images/thumb/my-thumb.png" alt="My Thumb" className="my-thumb" />
      <h1 className="text-[1.25rem]">
        <b>
          Hello there!
          <br />
          Welcome to my portfolio.
        </b>
      </h1>
      <br />
      <p>
        I am <b>Duy Nguyen</b>, a husband, a father of one, I was born in&nbsp;
        <a href="https://en.wikipedia.org/wiki/Ho_Chi_Minh_City" target="_blank" rel="noreferrer">
          Ho Chi Minh, Vietnam
        </a>
        &nbsp;where I lived most of my life. I am a full-time full-stack developer.
      </p>
      <br />
      <p>
        In my free time I like to play with my daughter and do housework with my wife in the
        morning. When the night comes I like to practice and develop some TypeScript libraries to
        expand my skillset.
      </p>
      <br />
      <p>
        I have a passion for motorcycles, I have a Yamaha motorcycles that I often used to ride
        around the city with my wife and my daughter.
      </p>
      <br />
      <h1 className="text-[1.25rem]">
        <b>Have fun on your stay here!</b>
      </h1>
    </section>
  );
};

const AboutMeProgram = createProgramFile({
  component: UI,
  name: "About Me",
  width: 600,
  height: 525,
});

export default AboutMeProgram;
