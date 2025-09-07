import classNames from 'classnames'
import { Fragment, memo } from 'react'
import './css.css'

type DButtonProps = Omit<React.ComponentProps<'button'>, 'prefix'> & {
  btnType?: string
  isLoading?: boolean
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const DButtonComp = ({
  type = 'button',
  btnType = 'normal',
  isLoading = false,
  disabled,
  children,
  className,
  prefix,
  suffix,
  onClick,
  ...rest
}: DButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (isLoading || !onClick) return
    onClick(event)
  }

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={classNames(className, 'd-button', btnType)}
      {...rest}
    >
      <Fragment>
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </Fragment>
    </button>
  )
}

export const DButton = memo(DButtonComp)
