import { InputHTMLAttributes, memo } from 'react'
import './css.css'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const DInputFieldComp = ({ label, ...rest }: InputFieldProps) => (
  <label className='d-input-field'>
    {label !== '' && <p>{label}</p>}
    <input {...rest} />
  </label>
)

export const DInputField = memo(DInputFieldComp)
