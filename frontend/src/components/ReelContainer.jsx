import React, { useEffect } from 'react'
import Reel from './Reel'
import ReelSkull from './ReelSkull'
import axiosInstance from '../store/axios'
import { useSelector, useDispatch } from 'react-redux'
import { setReels } from '../lib/reelSlice'


const ReelContainer = () => {
    const reels = useSelector((state) => state.reel.reels)
    const dispatch = useDispatch()

    const loadReels = async () => {
        await axiosInstance.get('/reel/get-reels').then((res) => {
            console.log(res.data);
            dispatch(setReels(res.data))

        }).catch((err) => {
            console.log(err);

        })
    }

    useEffect(() => {
        loadReels()
    }, [])

    console.log(reels);
    
    return (
        <div className='w-full h-full carousel carousel-vertical bg-green-300'>
            {
                reels !== null ? <>

                    {
                        reels && reels.map((reel, index) => (
                            reel ?
                                <Reel key={index} reel={reel} />
                                :
                                <ReelSkull />
                        ))

                    }


                </> :
                    <div className='w-full h-full flex items-center justify-center'>
                        <h1>user offline</h1>
                    </div>
            }
        </div>
    )
}

export default ReelContainer
