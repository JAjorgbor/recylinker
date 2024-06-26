'use client'
import StatusBadge from '@/components/elements/StatusBadge'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import moment from 'moment'
import type { FC } from 'react'
import { MoreVertical } from 'react-feather'

interface DropOffsProps {
  className?: string
}

const DropOffsTable: FC<DropOffsProps> = ({ className }) => {
  return (
    <>
      <div className={className ?? 'md:w-[90%] mx-auto'}>
        <Table>
          <TableHeader>
            <TableColumn className='min-w-[150px]'>DRIVER NAME</TableColumn>
            <TableColumn>DRIVER PHONE NUMBER</TableColumn>
            <TableColumn className='min-w-[200px]'>DROP OFF DATE</TableColumn>
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
                          <DropdownItem key='1'>
                            View Pickup Details
                          </DropdownItem>
                          <DropdownItem key='2'>Cancel Pickup</DropdownItem>
                          <DropdownItem key='3'>
                            View Driver Profile
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
    </>
  )
}
export default DropOffsTable
