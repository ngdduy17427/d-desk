import { MdArrowBack, MdArrowUpward } from 'react-icons/md'

type SkillNavProps = {
  handleGoBack: () => void
}

export const SkillNav = ({ handleGoBack }: SkillNavProps) => {
  const handleScrollTop = () =>
    document.getElementById('skillsAside')?.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className='skill-nav'>
      <button
        type='button'
        onClick={handleGoBack}
      >
        <MdArrowBack />
      </button>
      <button
        id='btnScrollTop'
        type='button'
        onClick={handleScrollTop}
      >
        <MdArrowUpward />
      </button>
    </div>
  )
}
