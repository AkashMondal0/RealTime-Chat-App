import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { Loading2 } from '../loading/loading'
import UserDataApi from '../../service/UserData_Api'

const Search = ({ }) => {
    const AuthState = useContext(AuthContext)
    const [searchUser, setSearchUser] = useState("")
    const [userList, setUserList] = useState(null)


    const _SearchUser = async () => {
        // valid search input
        if (searchUser.length > 1) {
            let res = await UserDataApi.searchUser(AuthState?.state?.Author?._id, searchUser)
            setUserList(res)
        }
    }

    const addUser = async (userId) => {
        document.getElementById(userId).style.display = "flex";
        document.getElementById(userId + "sky").style.display = "none";

        let loggedUser = AuthState?.state?.Author?._id

        await axios.put(process.env.apikey + `/users/${userId}/chatting`, { userId: loggedUser })
        await axios.post(process.env.apikey + `/conversation`, { senderId: loggedUser, receiverId: userId, lastMessage: "New Friend", lastMessageTime: "" })
        // remove user from array by id
        let removeUser = userList.filter((item) => {
            if (item._id !== userId) {
                return item
            }
        })
        setUserList(removeUser)
        document.getElementById(userId).style.display = "none";
        document.getElementById(userId + "sky").style.display = "flex";
        // UserDataApi.fetchFriends(loggedUser)
        AuthState.StartApp(null)
    }

    return (
        <div>
            <div className='flex justify-center mt-2'>
                <div className='w-full'>
                    <div className='mx-4'>
                        <div className="relative flex items-center w-full h-9 rounded-full bg-gray-200 overflow-hidden border">
                            {/* <div className="grid place-items-center h-full w-12 text-gray-700 bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div> */}
                            <input
                                value={searchUser}
                                onChange={(e) => { setSearchUser(e.target.value) }}
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-gray-200 px-3"
                                type="text"
                                id="search"
                                placeholder="Search..." />
                            <div className='flex justify-end'>
                                <button onClick={_SearchUser} className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* search button */}
                    </div>
                    {/* user list */}

                    <div className='my-6'>
                        <>{
                            userList == null ? <></> : <>
                                {userList.filter((item) => {
                                    if (searchUser === "") {
                                        // return item;
                                    } else if (item.username.toLowerCase().includes(searchUser.toLowerCase())) {
                                        return item;
                                    }
                                }).map((item, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => { addUser(`${item?._id}`) }}
                                            className="flex flex-row hover:bg-gray-300 rounded-xl p-2 justify-between h-20 cursor-pointer m-2">
                                            <div className='flex items-center justify-between w-full px-2'>
                                                <div className='flex items-center justify-center'>
                                                    <div className="avatar">
                                                        <div className="w-12 rounded-full">
                                                            <img src={item?.profilePicture||"/no-user.jpg"} />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 font-semibold">{item?.username}</div>
                                                </div>
                                                <div id={item?._id + "sky"} className="flex"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                </svg></div>
                                                <div id={item?._id} className="hidden"><Loading2 /></div>
                                            </div>
                                        </div>
                                    )
                                })}</>
                        }
                        </>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search