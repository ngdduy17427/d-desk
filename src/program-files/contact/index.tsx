import classNames from 'classnames'
import { DContainer } from 'components/d-container'
import { DPerspectiveIcon } from 'components/d-perspective-icon'
import { DTypingText } from 'components/d-typing-text'
import { ProgramFile, createProgramFile } from 'program-files'
import { ReactNode, useState } from 'react'
import { SiGmail, SiLinkedin } from 'react-icons/si'
import { uniqueId } from 'utils/utils-helper'
import './css.css'

type Contact = {
  id?: string
  icon: ReactNode
  link: string
}

const createContact = ({ icon, link }: Contact): Contact => ({
  id: uniqueId(),
  icon,
  link,
})

const contactList: Array<Contact> = [
  createContact({
    icon: <SiGmail color='#d5463a' />,
    link: 'mailto:ngdduy17427@gmail.com',
  }),
  createContact({
    icon: <SiLinkedin color='#0a66c2' />,
    link: 'https://www.linkedin.com/in/ngdduy17427',
  }),
]

const UI = ({ windowState }: ProgramFile) => {
  const [isFinishText, setIsFinishText] = useState(false)
  const [isFinishTextDelay, setIsFinishTextDelay] = useState(false)

  return (
    <DContainer className='contact-container'>
      <section className='contact-content'>
        <DTypingText
          texts='If you are interested please contact me at:'
          className={classNames('intro', { finish: isFinishText })}
          onFinish={(isFinish) => {
            setIsFinishText(isFinish)

            setTimeout(() => setIsFinishTextDelay(isFinish), 500)
          }}
        />
        {isFinishTextDelay && (
          <div className='contacts'>
            {contactList.map((contact) => (
              <DPerspectiveIcon
                key={contact.id}
                className='contact-icon'
                windowSizing={windowState.sizing}
              >
                <a
                  href={contact.link}
                  target='_blank'
                  rel='noreferrer'
                >
                  {contact.icon}
                </a>
              </DPerspectiveIcon>
            ))}
          </div>
        )}
      </section>
    </DContainer>
  )
}

export const ContactProgram = createProgramFile({
  name: 'Contact',
  component: UI,
  windowState: {
    width: 500,
    height: 200,
  },
})
