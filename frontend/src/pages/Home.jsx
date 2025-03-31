import React from 'react'
import User from '../components/User'
import { useSelector } from 'react-redux'
import ReelContainer from '../components/ReelContainer'

const Home = () => {
  const authUser = useSelector((state) => state.user.authUser)
  // console.log(authUser);

  return (
    <div className='h-screen w-full  flex items-center justify-center'>
      <div className='h-full sm:h-[80%] w-full sm:w-[80%]  max-w-sm border-none sm:border flex items-center justify-center'>
        {
          authUser && <ReelContainer />
        }

      </div>
    </div>
  )
}

export default Home
