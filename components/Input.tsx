import { classNames } from '@/lib/utils'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        'border-2 px-6 py-2 text-lg rounded-2xl w-full',
        className ?? ''
      )}
      {...props}
    />
  )
}

export default Input
