import React, { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'

const Video = ({ video }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // Initially playing
    console.log(isPlaying);
    

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Reset to start
            videoRef.current.play(); // Play again
            setIsPlaying(true);
        }
    };

    return (
        <div className='w-full h-[55vh] flex flex-col items-center justify-center space-y-4'>
            {/* Video */}
            <video
                ref={videoRef}
                className='w-72'
                autoPlay
                onEnded={handleVideoEnd}
>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                className="px-4 py-4 text-white shadow-md hover:bg-blue-600 absolute rounded-full cursor-pointer transition duration-300 delay-75"
            >
                {isPlaying ? <FaPause/> : <FaPlay/>}
            </button>
        </div>
    );
};

export default Video;
