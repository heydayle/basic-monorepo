import { twMerge } from 'tailwind-merge'

const SIZES = {
  xs: 'text-xs px-2 py-1 rounded-xs',
  sm: 'text-sm px-3 py-1.5 rounded-sm',
  md: 'text-base px-4 py-2 rounded-md',
  lg: 'text-lg px-5 py-2.5 rounded-lg',
  xl: 'text-xl px-6 py-3 rounded-xl',
} as const

const VARIANTS = {
  default: '',
  outline: 'bg-none border',
} as const
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary'
  variant?: 'default' | 'outline' | 'ghost'
  block?: boolean
  icon?: boolean
  size?: keyof typeof SIZES
  rounded?: boolean
}
const buttonDefaultProps = {
  color: 'primary',
  block: false,
  icon: false,
  size: 'md',
  rounded: false,
  variant: 'default',
}

export default function Button(props: ButtonProps) {
  const { color, block, icon, size, rounded, variant, className, ...rest } = {
    ...buttonDefaultProps,
    ...props,
  }

  const variantClasses = VARIANTS[variant as keyof typeof VARIANTS]
  const sizeClasses = SIZES[size as keyof typeof SIZES]
  const iconClass = icon ? 'p-2' : 'px-4 py-2'
  const blockClass = block ? 'w-full rounded-md' : ''

  const colorClasses = () => {
    switch (variant) {
      case 'ghost': {
        return color === 'primary'
          ? 'border-0 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-900'
          : 'border-0 text-gray-600 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
      }
      case 'outline': {
        return color === 'primary'
          ? 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50'
          : 'border-gray-600 text-gray-600 hover:bg-gray-100 dark:border-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800'
      }
      default: {
        return color === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-neutral-200 dark:bg-neutral-700 text-primary hover:bg-neutral-300 dark:hover:bg-neutral-600'
      }
    }
  }

  const buttonClassName = twMerge(
    'p-2 border font-medium cursor-pointer focus:outline-none focus:ring transition duration-150 ease-in-out',
    variantClasses,
    sizeClasses,
    colorClasses(),
    iconClass,
    rounded && 'rounded-full',
    blockClass,
    className
  )

  return <button {...rest} className={buttonClassName} />
}
