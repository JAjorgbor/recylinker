import type { FC } from 'react'

interface StatusBadgeProps {
  variant?: 'success' | 'pending' | 'cancelled'
  text?: string
}

const StatusBadge: FC<StatusBadgeProps> = ({
  variant = 'success',
  text = 'Completed',
}) => {
  let color
  switch (variant) {
    case 'success':
      color = 'green'
      break
    case 'pending':
      color = 'yellow'
      break
    case 'cancelled':
      color = 'red'
  }
  return (
    <span
      className={`py-1 px-2 text-xs bg-${color}-200 text-${color}-500 rounded-xl text-center capitalize`}
    >
      {text}
    </span>
  )
}

export default StatusBadge
