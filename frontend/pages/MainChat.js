import React, { useEffect, useState, useRef, useContext, useReducer, useMemo } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy, setDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import Chat from '../components/ChatRoom/ChatRoom'
import LeftBar from '../components/leftBar/LeftBar'
import axios from 'axios'
import Profile from '../components/profile/profile'

const initialState = {
    loading: false,
    conversationData: null,
    ISinChat: false,
    room_Id: "empty",
    responsive: false,
    toggle: false,
    SelectedUser: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONVERSATION_CHAT_ENTER':
            return {
                ...state,
                conversationData: action.payload,
                loading: false,
                ISinChat: true,
                room_Id: action.payload.roomId,
            }
        case 'LOADING_TRUE':
            return {
                ...state,
                loading: action.payload,
                toggle: true
            }
        case 'LOADING_FALSE':
            return {
                ...state,
                loading: action.payload,
            }

        case 'SELECTED_USER':
            return {
                ...state,
                SelectedUser: action.payload
            }
        case 'BACK_TO_USER_LIST':
            return {
                ...state,
                toggle: false
            }
        default:
            return state
    }
}

const getLocalMessages = () => {
    let allMessages = localStorage.getItem('allMessages')
    if (allMessages) {
        return JSON.parse(allMessages)
    } else {
        return []
    }
}


const MainChat = ({ data }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [screenSize, setScreenSize] = useState({
        width: window.screen.width,
        height: window.screen.height
    })

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    })
    ///////////////////////////////////
    let conversationData = async (user, Author, msg, roomId) => {

        let RoomDetails = data.userFriends.find((data) => {
            if (data._id === roomId) {
                return data
            }
        })
        const conversationUsers = {
            roomId: roomId,
            // sender user / other user data
            otherUser: {
                _id: user?._id,
                email: user?.email,
                username: user?.username,
                profilePicture: user?.profilePicture,
            },
            // my user data
            author: {
                _id: Author?._id,
                email: Author?.email,
                username: Author?.username,
                profilePicture: Author?.profilePicture,
            },
            messages: msg,
            RoomDetails: RoomDetails
        }
        dispatch({
            type: 'CONVERSATION_CHAT_ENTER',
            payload: conversationUsers
        })
    }

    const firebaseConversationData = async (room_Id, user) => {
        const messagesRef = collection(db, room_Id || "empty");
        const queryMessage = query(messagesRef,
            // where("room", "==", room),
            orderBy("timestamp"));
        let unsubscribe = onSnapshot(queryMessage, (Snapshot) => {
            let messages = []
            Snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            if (user !== null) {
                conversationData(user, data?.Author, messages, room_Id)
            }
        });

        return () => {
            unsubscribe()
        }
    }

    // user click function
    const fetchUserConversation = async (friendId) => {

        dispatch({
            type: 'LOADING_TRUE',
            payload: true,
        })
        try {
            const user = await axios.get(process.env.apikey + `/users?userId=${friendId}`)
            const roomId = await axios.post(process.env.apikey + `/conversation/inChat`,
                { senderId: data?.Author?._id, receiverId: friendId })
            dispatch({
                type: 'SELECTED_USER',
                payload: user.data._id
            })

            // user data
            if (state.SelectedUser !== user.data._id) {

                firebaseConversationData(roomId.data._id, user.data)
            } else {
                console.log("same user")
                dispatch({
                    type: 'LOADING_FALSE',
                    payload: false,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Profile data={data?.Author} forName={"AuthorProfile"} />
            <div className="flex" style={{ "height": "90vh" }}>
                {screenSize.width < 728 ?
                    <div className='w-full'>
                        {/* toggle chat component and user list component */}
                        {state.toggle == false ?
                            <LeftBar
                                SelectedUser={state.room_Id}
                                dispatch={dispatch}
                                data={data}
                                height={screenSize.height} width={screenSize.width}
                                fetchUserConversation={fetchUserConversation}
                            /> :
                            <Chat
                                dispatch={dispatch}
                                data={state}
                                height={screenSize.height} width={screenSize.width}
                                fetchUserConversation={fetchUserConversation}
                            />
                        }
                    </div> :
                    <>
                        <div className='md:w-96 w-full'>
                            <LeftBar
                                SelectedUser={state.room_Id}
                                dispatch={dispatch}
                                data={data}
                                height={screenSize.height} width={screenSize.width}
                                fetchUserConversation={fetchUserConversation}
                            />
                        </div>
                        <div className='w-full'>
                            <Chat
                                data={state}
                                height={screenSize.height} width={screenSize.width}
                                fetchUserConversation={fetchUserConversation}
                            />

                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default MainChat