import React from 'react'
import ResellTicket from './ResellTicket'
import TicketLogElement from './TicketLogElement'

const MyTickets = () => {
  return (
    <div className='my-10 mx-16'>
      <div className='flex flex-col justify-start'>
        <div className='text-poppins mb-8 text-21xl font-bold text-white'>My Tickets :</div>
        <div className='text-poppins text-4xl font-medium text-white'>Recent :</div>
        <div className='flex mx-2 my-4 justify-between'>
          <ResellTicket />
          <ResellTicket />
        </div>
        <div className='text-poppins text-4xl font-medium text-white'>History :</div>
        <div className='w-full h-1/3 flex flex-col overflow-y-scroll mx-2 my-2'>
          <TicketLogElement />
          <TicketLogElement />
          <TicketLogElement />
          <TicketLogElement />
          <TicketLogElement />
        </div>
      </div>
    </div>
  )
}

export default MyTickets