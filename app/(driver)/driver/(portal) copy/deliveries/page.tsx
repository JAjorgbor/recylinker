import DeliveriesTable from '@/components/driver/deliveries/DeliveriesTable'
import type { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <DeliveriesTable />
    </>
  )
}
export default page
