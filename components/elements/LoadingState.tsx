import { Spinner } from '@nextui-org/react'
import type { FC, ReactNode } from 'react'

interface LoadingStateProps {
  loader?: ReactNode
}

const LoadingState: FC<LoadingStateProps> = ({ loader = <Spinner /> }) => {
  return (
    <>
      <div className='min-h-[300px] grid place-items-center'>{loader}</div>
    </>
  )
}
export default LoadingState
