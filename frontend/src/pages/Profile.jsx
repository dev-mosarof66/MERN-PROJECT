import React, { useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileLoader from '../components/ProfileLoader'

const Profile = () => {

    const authUser = useSelector((state) => state.user.authUser)
    console.log(authUser);
    useEffect(() => {
        console.log(`profile rendered`);
    }, [authUser])

    return (
        <div className='w-full h-screen  flex items-center justify-center'>
            {
                authUser ?
                    <div className='w-full h-fit flex items-center justify-center'>
                        <div className='w-full sm:w-md bg-base-200 h-full flex flex-col items-center py-4 space-y-6'>
                            <div className='flex flex-col items-center justify-center space-y-2'>
                                <div className='size-24 rounded-full bg-black'></div>
                                <div>
                                    {
                                        authUser &&
                                        <h1>{authUser.username}</h1>
                                    }
                                </div>
                            </div>
                            <div className='w-full list-none flex items-end justify-around gap-3'>
                                <NavLink to={'upload'} className={({ isActive }) => isActive ? "border-b border-accent" : "hover:border-b transition-transform duration-300 cursor-pointer"}>
                                    upload
                                </NavLink>
                                <NavLink to={'uploaded-reels'} className={({ isActive }) => isActive ? "border-b border-accent" : "hover:border-b transition-transform duration-300 cursor-pointer"}>
                                    your reels
                                </NavLink>
                            </div>


                            <div className='w-full h-[40vh]'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                    :
                    <ProfileLoader />
            }
        </div>
    )
}

export default Profile
