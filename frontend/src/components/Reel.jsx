import React from 'react';
import { FaHeart } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import User from './User';
import Video from './Video';

const Reel = ({ reel }) => {
    const liked = false;

    return (
        <div className='w-full h-full bg-black flex flex-col items-start justify-around relative carousel-item'>

            <User />

            {/* Video Section */}
            <Video video={reel.url} />

            {/* Footer Section */}
            <div className="flex flex-col gap-2 px-4 relative z-50">
                <h1>{reel?.title || "Untitled Reel"}</h1>
                <h2>{reel?.description || "No description available."}</h2>
            </div>

            {/* Like & Comment Section */}
            <div className='absolute right-4 bottom-16 space-y-2'>
                <div className='flex flex-col items-center'>
                    <div className='px-2 py-2 hover:bg-gray-300/50 cursor-pointer transition duration-200 delay-75 '>
                        <FaHeart color={liked ? "red" : "white"} size={20} />
                    </div>
                    <p>{reel?.likes?.length || 0}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='px-2 py-2 hover:bg-gray-300/50 cursor-pointer transition duration-200 delay-75 '>
                        <MdModeComment size={20} />
                    </div>
                    <p>{reel?.comments?.length || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default Reel;
