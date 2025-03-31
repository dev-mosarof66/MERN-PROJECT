import React, { useEffect } from 'react'
import '../../public/public.css'
import axiosInstance from '../store/axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUploadedReels } from '../lib/reelSlice'

const YourReels = () => {
  const uploadedReels = useSelector((state) => state.reel.uploadedReels)
  const dispatch = useDispatch()

  const fetchUploadedReels = async () => {
    await axiosInstance.get('/reel/uploaded-reels')
      .then((res) => {
        dispatch(setUploadedReels(res.data))
        console.log(res.data);

      }).catch((error) => {
        console.error(error);

      })
  }


  useEffect(() => {
    fetchUploadedReels()
  }, [dispatch])


  return (
    <div className='scrollbar w-full grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-scroll h-[38vh] sm:h-[48vh]  p-4'>
      {
        uploadedReels ? uploadedReels.map((reel, index) => (
          <>
            <YourReel key={reel._id || index} reel={reel} />
          </>
        )) : <p>no reels</p>
      }
    </div>
  )
}



const YourReel = ({ reel }) => {
  return (
    <div className="card card-sm bg-base-300 w-24 sm:w-28 h-fit shadow-md hover:scale-105 transition duration-300 delay-75 cursor-pointer hover:shadow-lg shadow-black">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
      </figure>
      <div className='p-2'>
        <h1 className='text-sm'>{reel.title}</h1>
      </div>
    </div>
  )
}

export default YourReels
