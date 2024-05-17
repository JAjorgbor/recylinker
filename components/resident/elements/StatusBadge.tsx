'use client'
import type { FC } from 'react'

interface StatusBadgeProps {
  type?: 'success' | 'pending' | 'cancelled'
  text?: string
}

const StatusBadge: FC<StatusBadgeProps> = ({
  type = 'success',
  text = 'Completed',
}) => {
  let color
  switch (type) {
    case 'success':
      color = 'green'
      break
    case 'pending':
      color = 'yellow'
      break
    case 'cancelled':
      color = 'red'
      break
    default:
      color = 'green'
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
