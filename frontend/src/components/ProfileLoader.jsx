import React from 'react'

const ProfileLoader = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-md bg-base-200 h-[60vh] flex flex-col items-center py-4 space-y-6'>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <div className='size-24 rounded-full bg-black skeleton' />
                    <div className="skeleton h-4 w-20 bg-black" />
                </div>
                <div className='w-full list-none flex items-end justify-around gap-3'>
                    <div className="skeleton h-4 w-20 bg-black" />
                    <div className="skeleton h-4 w-20 bg-black" />
                </div>
                <div className='w-[90%] h-60 bg-black m-2 skeleton'>

                </div>
            </div>
        </div>
    )
}

export default ProfileLoader
