import { MdArrowBack, MdArrowUpward } from "react-icons/md";

const SkillNav = ({ handleGoBack }: { handleGoBack: () => void }) => {
  const handleScrollTop = () =>
    document.getElementById("skillComponent")?.scrollTo({ top: 0, behavior: "smooth" });

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
