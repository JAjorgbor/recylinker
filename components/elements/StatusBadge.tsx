'use client'
import type { FC } from 'react'

interface StatusBadgeProps {
  type?: 'completed' | 'pending' | 'cancelled' | 'accepted' | 'rejected'
  text?: string
}

const StatusBadge: FC<StatusBadgeProps> = ({
  type = 'completed',
  text = 'Completed',
}) => {
  let color
  switch (type) {
    case 'completed':
      color = 'bg-green-200 text-green-600'
      break
    case 'accepted':
      color = 'bg-purple-200 text-purple-600'
      break
    case 'rejected':
      color = 'bg-danger-100 text-danger-600'
      break
    case 'pending':
      color = 'bg-yellow-200 text-yellow-600'
      break
    case 'cancelled':
      color = 'bg-red-200 text-red-600'
      break
    default:
      color = 'bg-green-200 text-green-600'
  }
  return (
    <span
      className={`py-1 px-2 text-xs ${color} rounded-xl text-center capitalize`}
    >
      {text}
    </span>
  )
}

export default StatusBadge
