import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
}
export default function Input(props: InputProps) {
  const { isError, className, ...rest } = props

  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const onTogglePasswordVisibility = () => {
    setIsShowingPassword((prev) => !prev)
  }

  const EyeButton = () => {
    return (
      <button
        type='button'
        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
        onClick={() => onTogglePasswordVisibility()}
      >
        {!isShowingPassword ? <EyeClosed /> : <Eye />}
      </button>
    )
  }

  const passwordPaddingClass = rest.type === 'password' ? 'pr-10' : ''
  const errorClass = isError
    ? 'border-red-500 outline-none focus:border-red-500 focus:ring-red-500 active:border-red-500 active:ring-red-500'
    : 'border-gray-300'
  const inputClass = twMerge(
    'w-full h-10 p-4 border rounded-md',
    passwordPaddingClass,
    className,
    errorClass
  )

  return (
    <div className='relative'>
      <input {...rest} type={isShowingPassword ? 'text' : rest.type} className={inputClass} />
      {rest.type === 'password' && <EyeButton />}
    </div>
  )
}
