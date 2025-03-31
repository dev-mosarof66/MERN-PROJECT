import React, { useRef, useState } from 'react';
import axiosInstance from '../store/axios';
import toast from 'react-hot-toast'

const Upload = () => {
    const ref = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        ref.current.click();
    };

    const [getInput, setInput] = useState({
        title: "",
        description: ""
    })

    const handleUploadReel = async (selectedFile) => {
        if (!selectedFile) return alert("Please select a file!");

        setLoading(true);

        const formData = new FormData();
        formData.append("title", getInput.title);
        formData.append("description", getInput.description);
        formData.append("video", selectedFile);

        try {
            const res = await axiosInstance.post('/reel/upload-reel', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res);
            toast.success(res.data.message)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=' w-[80%] mx-auto p-4 card gap-2'>
            <div className='flex flex-col gap-2'>
                <div className='border p-2 border-gray-600'>
                    <input value={getInput.title} onChange={(e) => {
                        setInput({
                            ...getInput,
                            title: e.target.value
                        })
                    }} className='border-none outline-none w-full' type="text" placeholder='title' />
                </div>
                <div className='border p-2 border-gray-600'>
                    <input value={getInput.description} onChange={(e) => {
                        setInput({
                            ...getInput,
                            description: e.target.value
                        })
                    }} className='border-none outline-none w-full' type="text" placeholder='description' />
                </div>
            </div>
            <div className='flex gap-2 p-2'>
                <input className='hidden' ref={ref} type="file" onChange={(e) => {
                    console.log(e.target.files[0]),
                        setSelectedFile(e.target.files[0])
                }} />
                <p className='cursor-pointer' onClick={handleClick}>Choose file</p>
                <div>
                    {
                        selectedFile && <p>{selectedFile.name}</p>
                    }
                </div>
            </div>

            <div className='w-full flex items-center justify-center'>
                <button onClick={() => handleUploadReel(selectedFile)} className='btn btn-secondary w-full'>
                    {
                        loading ? <>
                            <span className='loading'></span>
                        </> : " Upload"
                    }
                </button>
            </div>
        </div>
    );
};

export default Upload;
