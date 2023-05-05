import axios from 'axios'
import React, { useState, useEffect, useMemo } from 'react'
import Format from '../timeFormat/timeFormat'


const UserCard = ({ item, fetchUserConversation, data }) => {
    const [user, setUser] = useState(null)
    const { userFriends, Author } = data


    const fetUser = async (id) => {
        if (Object.keys(id).length === 0) {
            // console.log("id is empty")
        } else {
            let res = await axios.get(process.env.apikey + `/users?userId=${id}`)
            setUser(res.data)
            // console.log(res.data)
        }
    }

    useMemo(() => {
        if (item) {
            item?.members?.filter((item) => item !== Author._id).forEach(element => {
                fetUser(element)
            });
        }
    }, [item])

    // old code
    // useEffect(() => {
    //     if (item) {
    //         item?.members?.filter((item) => item !== Author._id).forEach(element => {
    //             fetUser(element)
    //         });
    //     }
    // }, [userFriends])

    return (
        <>
            {user?.username ?
                <>
                    <div className='flex items-center justify-between w-full px-2' onClick={() => { fetchUserConversation(user?._id) }}>
                        <div className='flex items-center justify-center'>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user?.profilePicture||"/no-user.jpg"} />
                                </div>
                            </div>
                            <div>
                                <div className="ml-4 font-semibold">{user?.username || "Loading"}</div>
                                <div className='ml-4'>{item?.lastMessage || "Loading"}</div>
                            </div>

                        </div>
                        <div className='font-light text-xs'>{Format.Time(item?.updatedAt) || "Loading"}</div>
                    </div>
                </> : <div className="flex items-center mt-4 space-x-3 px-4">
                    <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd">
                        </path>
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>}
        </>
    )
}

export default UserCard