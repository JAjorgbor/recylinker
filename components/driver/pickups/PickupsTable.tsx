'use client'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import moment from 'moment'
import { MoreVertical } from 'react-feather'
import StatusBadge from '@/components/elements/StatusBadge'

const PickupsTable = ({ className }: { className?: string }) => {
  return (
    <div className={className ?? 'md:w-[90%] mx-auto'}>
      <Table>
        <TableHeader>
          <TableColumn className='min-w-[150px]'>RESIDENT NAME</TableColumn>
          <TableColumn>RESIDENT PHONE NUMBER</TableColumn>
          <TableColumn className='min-w-[200px]'>PICK UP DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {Array(10)
            .fill(null)
            .map((each: any, index: number) => (
              <TableRow key={index}>
                <TableCell>Tony Reichert</TableCell>
                <TableCell>0903003003</TableCell>
                <TableCell>
                  <div className='space-x-1'>
                    <span className='text-sm text-foreground-500'>
                      {moment().format('HH:MM A')}
                    </span>
                    <span>{moment().format('MMMM DD, YYYY')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge />
                </TableCell>
                <TableCell>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <button className='rounded-full p-2 bg-default-300 '>
                          <MoreVertical size={16} />
                        </button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem key='1'>View Pickup Details</DropdownItem>
                        <DropdownItem key='2'>Cancel Pickup</DropdownItem>
                        <DropdownItem key='3'>
                          View RESIDENT Profile
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PickupsTable
