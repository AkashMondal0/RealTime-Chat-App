import React, { useContext } from 'react'
import UserCard from '../Cards/UserCard';
import Loading from '../loading/loading';
import NoItem from '../loading/NoItem';
import Search from './search';
import AuthContext from '../../context/AuthContext';

const LeftBar = ({ fetchUserConversation, height, data, SelectedUser }) => {
    const dummy = new Array(10).fill(0);
    const Author = useContext(AuthContext)
    // console.log(data)
    return (
        <>
            {data?.userFriends === null ? <Loading /> :
                <div>
                    {/* header */}
                    <div className="flex flex-row items-center justify-between text-xs p-2 py-4" style={{ height: 40.65 }}>
                        <span className="font-bold text-lg mx-2">Sky Chats</span>
                        <div className='flex space-x-2'>

                            {/* <svg onClick={() => { router.push("/") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        <svg onClick={() => { router.push("/screen/search") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg> */}

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>

                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><label htmlFor='AuthorProfile'><a>Profile</a></label></li>
                                    <li onClick={() => {
                                        Author.dispatch({
                                            type: "LOGOUT"
                                        })
                                    }}><a>Logout</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className='border-b-2 border-gray-200'></div>
                    {/* user list */}

                    <Search />

                    {/* Title bar */}
                    <>
                        <span className="font-bold text-lg mx-5">Friends</span>
                        {data?.userFriends == "" ? <><NoItem /></>
                            :
                            <>
                                {
                                    data?.userFriends !== null ? <div className="overflow-y-scroll" style={{ "height": height - 140 }} id='style-3'>
                                        {data?.userFriends?.map((item, i) => {
                                            {/* console.log(item._id == SelectedUser) */ }
                                            return <div key={item._id} className={`flex flex-row hover:bg-gray-300 ${item._id == SelectedUser && "bg-gray-300"} rounded-xl p-2 justify-between h-20 cursor-pointer m-2`}>
                                                <UserCard
                                                    data={data}
                                                    item={item}
                                                    fetchUserConversation={fetchUserConversation}
                                                />
                                            </div>
                                        })}
                                    </div> : <div className="overflow-y-scroll" style={{ "height": height - 140 }} id='style-3'>
                                        {
                                            dummy.map((item, i) => {
                                                return <div className="flex items-center mt-4 space-x-3 px-4" key={i}>
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
                                                </div>
                                            })
                                        }</div>
                                }
                            </>
                        }
                    </>
                </div>}
        </>
    )
}

export default LeftBar;
