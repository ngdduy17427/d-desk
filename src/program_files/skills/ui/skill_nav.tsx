import { MdArrowBack, MdArrowUpward } from "react-icons/md";

interface ISkillNavProps {
  handleGoBack: () => void;
}

const SkillNav = ({ handleGoBack }: ISkillNavProps): JSX.Element => {
  const handleScrollTop = (): void =>
    document.getElementById("skillsAside")?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="skill-nav">
      <button type="button" onClick={handleGoBack}>
        <MdArrowBack />
      </button>
      <button id="btnScrollTop" type="button" onClick={handleScrollTop}>
        <MdArrowUpward />
      </button>
    </div>
  );
};

export default SkillNav;
