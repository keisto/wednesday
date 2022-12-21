import { classNames } from '@/lib/utils'

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className ?? ''
      )}
    >
      {children}
    </div>
  )
}

export default Card
