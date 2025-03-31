import React from 'react'
import { FaComment } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa6";

const Like = () => {
    return (
        <div className='absolute bottom-8 right-4'>

            <div className='flex flex-col items-center justify-center gap-3'>
                <div className='px-2 py-2 hover:bg-gray-600/50 cursor-pointer transition duration-200 delay-75'>
                    <FaHeart />
                </div>
                <div className='px-2 py-2 hover:bg-gray-600/50 cursor-pointer transition duration-200 delay-75'>
                    <FaComment />
                </div>
            </div>

        </div>
    )
}

export default Like
