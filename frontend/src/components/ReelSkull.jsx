import React from 'react'

const ReelSkull = () => {
    return (
        <div className='w-full h-full flex flex-col justify-between px-4 py-4 relative space-y-2'>
            <div className='w-full flex items-end justify-end'>

                <div className='size-9 rounded-full bg-base-200 flex justify-end items-end skeleton' />
            </div>

            {/* video  */}

            <div className='w-full h-[60vh] bg-base-300 flex items-center justify-center skeleton' />

            {/* footer  */}

            <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
            </div>

            <div className='absolute right-4 bottom-22 space-y-3'>
                <div className='size-8 bg-base-300 skeleton rounded-full' />
                <div className='size-8 bg-base-300 skeleton rounded-full' />
            </div>
        </div>
    )
}

export default ReelSkull
