import React from 'react'

export default function TicketLogElement() {
    return (
        <div className="relative w-full h-1/6 overflow-hidden m-auto">
            <div className='flex justify-between border-b-2'>
                <div className='h-48 bg-white rounded-lg mx-2 my-2 w-36'>
                    Image
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <div className='font-roboto text-white font-21xl'>Movie Name</div>
                    <div className='font-roboto text-gray-700 font-5xl'>Date Time</div>
                    <div className='flex font-roboto font-5xl'>
                        <div className='text-[#9DA8BE]'>Location Icon</div>
                        <div className='text-[#9DA8BE]'> Theatre Name</div>
                        <div className="text-[#414A63]">Show Typ</div>
                    </div>
                </div>
                <button class="rounded-none">Sold</button>
            </div>
        </div>
    )
}
