import { classNames } from '@/lib/utils'

const GlassPane: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'backdrop-blur-lg backdrop-saturate-200 rounded-2xl border-2 bg-white/[.4]',
        className ?? ''
      )}
    >
      {children}
    </div>
  )
}

export default GlassPane
