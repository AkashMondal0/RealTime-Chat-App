import React, { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import 'animate.css';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Loading from '../../components/loading/loading';
import Profile from '../profile/profile';
import ShareModal from '../show_modal/ShareModal';
import PhotoModal from '../show_modal/PhotoModal';
import { toast } from 'react-toastify';
import { BottomBar, SelectTopBar, TopBar } from '../bars/Bars';
import { ChatCardAuthorSide, ChatCardUserSide } from '../Cards/MessageCard';
import AuthContext from '../../context/AuthContext';
import UserDataApi from '../../service/UserData_Api';
import uploadFileApi from '../../service/Upload_Api';
import ChatApi from '../../service/chat_Api';

var today = new Date().toDateString();
var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', };

const ChatRoom = ({ width, height, data, dispatch }) => {
    const { responsive, conversationData, room_Id, ISinChat, loading } = data

    const AuthState = useContext(AuthContext)
    const messagesEndRef = useRef(null)

    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [selectedText, setSelectedText] = useState([])
    const [reply, setReply] = useState(null)

    const [state, setState] = useState({
        input: '',
        caption: '',
        img: [],
        urlImage: null,
        progress: 0,
        work: false,
    })


    //////////////////// js client function //////////////////////////////////////////////////////

    const selectTextItem = (e) => {
        let cod = document.getElementById(e.mid).classList.toString().includes("bg-gray-400")
        cod ? setSelectedText(selectedText.filter((item) => item.mid !== e.mid)) : setSelectedText([...selectedText, e])
        cod ? document.getElementById(e.mid).classList.remove("bg-gray-400") :
            document.getElementById(e.mid).classList.add("bg-gray-400")
    }

    const deselectAllTextItem = () => {
        for (let index = 0; index < selectedText.length; index++) {
            document.getElementById(selectedText[index].mid).classList.remove("bg-gray-400")
        }
        setSelectedText([])
        setReply(null)
    }

    const replyFunction = (e) => {
        setReply(selectedText[0])
        selectTextItem(selectedText[0])
    }

    const replySwipe = (e) => {
        // console.log(e)
        setReply(e)
    }

    const onChangeInput = (e) => {
        setState({ ...state, input: e })
    }

    const ReSetValue = () => {
        setState({
            ...state,
            input: '',
            caption: '',
            img: [],
            urlImage: null,
            progress: 0,
            work: false,
        })  // reset state
        deselectAllTextItem()
    }

    const To_Bottom = () => {
        messagesEndRef.current?.scrollIntoView({ scrollY: 0 })
    }

    //////////////////// firebase function //////////////////////////////////////////////////////

    const ChatSendHandle = async () => {
        const newMessage = {
            replyText: reply?.text || null, // reply text
            replyImg: reply?.img || null, // reply img
            replyId: reply?.id || null, // reply id
            replyVideo: reply?.video || null, // reply video

            user: conversationData?.author?._id, // user id
            message: state.input == "" ? null : state.input, // user reply input text
            caption: state.caption || null, // caption
            img: state.urlImage,
            video: null,
            audio: null,
            timestamp: serverTimestamp(),
            _date: today,
        }

        // for update user list 
        const UpdateUserList = {
            conversationId: data?.room_Id, // room id
            lastMessage: state.input || state.caption || "Photo",
            // messages: conversationData.messages,
        }
        ReSetValue()
        await ChatApi.CreateMessage(newMessage, data?.room_Id) // create message 
        To_Bottom()
        await ChatApi.UpdateUserChatList(UpdateUserList)
        let res = await UserDataApi.fetchFriends(conversationData.author._id) // author id
        AuthState.dispatch({
            type: "REFRESH_FRIENDS",
            payload: res
        })

    }

    const uploadPhotoHandle = async () => {
        let arr = []
        // upload file and store the url in the array
        let call = async (data) => {
            let res = await uploadFileApi.uploadFile(data) // return url
            arr.push(res)
            // image upload done ===> than
            if (arr.length === state.img.length) {
                setState({
                    ...state, progress: 100, urlImage: arr
                })
            }
        }
        state.img.map((item) => {
            // loop through the array and call the function
            call(item)
        })
    }
    const sendMessageHandle = async () => {
        const img = state.img
        if (img !== null) {
            if (img.length > 0) { // "photo"
                ChatSendHandle()
            } else if (reply !== null) { // reply
                ChatSendHandle()
            }
            else {
                if (state.input.length > 0) { // Chat 
                    ChatSendHandle()
                }
            }
        }
    }

    const filePicker = (e) => {
        let arr = []
        let arrLength = e.target.files.length
        if (arrLength < 5) {
            for (let i = 0; i < e.target.files.length; i++) {
                const newImg = e.target.files[i];
                newImg["id"] = Math.random();
                arr.push(newImg)
            }
            setState({ ...state, img: arr, work: true })
        } else {
            toast.error("You can't send more than 4 photos", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    /// scroll to bottom
    useEffect(() => {
        ReSetValue()
        To_Bottom()
    }, [conversationData?.messages]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessageHandle();
        }
    }


    return (
        <> {loading == true ? <Loading /> : <div>
            {/* showing photo modal */}
            {selectedPhoto !== null && <PhotoModal selectedPhoto={selectedPhoto} />}
            {/* //share Photo Modal */}
            <ShareModal
                ReSetValue={ReSetValue}
                filePicker={filePicker}
                uploadPhotoHandle={uploadPhotoHandle}
                sendMessageHandle={sendMessageHandle}
                data={state}
            />
            {/* //profile Photo */}
            <Profile data={conversationData?.otherUser} forName={"OtherProfile"} />
            {ISinChat !== true ? <>
                {width < 728 && backBtn !== false ?
                    <Loading /> :
                    <><div className='justify-center items-center flex' style={{ "height": "90vh" }}>
                        <img className='w-96 h-96'
                            src='https://firebasestorage.googleapis.com/v0/b/next-chat-b2e58.appspot.com/o/icons%2Fundraw_Team_up_re_84ok.png?alt=media&token=b9288b01-18ac-4e2d-8ed2-c8ebde51ada2' />
                    </div>
                        <div className='flex justify-center items-end font-semibold text-gray-600 text-5xl'>BY SKY INC</div></>
                }</>
                :
                <>
                    <div className="flex flex-col flex-auto" style={{ "height": height }} >
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-1 max-h-full min-h-full">
                            {/* header */}
                            {selectedText.length > 0 ?
                                // SelectTopBer(deselectAllTextItem, selectedText, replyFunction, conversation)
                                <SelectTopBar selectedText={selectedText} deselectAllTextItem={deselectAllTextItem} replyFunction={replyFunction} conversation={conversation} />
                                :
                                <TopBar data={data}
                                    dispatch={dispatch}
                                />
                            }
                            {/* chat box */}
                            <div className="flex-1 overflow-auto" id='style-3'>
                                <div className="">

                                    <div className="flex justify-center mb-4 m-4">
                                        <div className="rounded py-2 px-4 bg-yellow-100">
                                            <p className="text-xs" id={"note"}>
                                                Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                            </p>
                                        </div>
                                    </div>
                                    <>{conversationData.messages?.filter((value, index, self) =>
                                        index === self.findIndex((t) => (
                                            t._date === value._date
                                        ))
                                    ).map((date, index) => {
                                        // remove duplicate date
                                        return <div key={index}>
                                            <div className="flex justify-center mt-5 mb-2">
                                                <div className="rounded py-2 px-4 my-3 bg-gray-300">
                                                    <p className="text-sm uppercase">
                                                        {new Date(`${date._date}`).toLocaleDateString("en-US", options)}
                                                    </p>
                                                </div>
                                            </div>
                                            <>{
                                                conversationData.messages?.filter((item) => {
                                                    return item._date.includes(date._date)
                                                }).map((message, i) => {
                                                    let me = conversationData.author._id // author id
                                                    return message.user === me ?
                                                        <ChatCardAuthorSide
                                                            key={i}
                                                            selectTextItem={selectTextItem}
                                                            message={message}
                                                            width={width}
                                                            data={conversationData.author}
                                                            setSelectedPhoto={setSelectedPhoto}
                                                            replySwipe={replySwipe} />
                                                        :
                                                        <ChatCardUserSide
                                                            key={i}
                                                            selectTextItem={selectTextItem}
                                                            message={message}
                                                            width={width}
                                                            data={conversationData.otherUser}
                                                            setSelectedPhoto={setSelectedPhoto}
                                                            replySwipe={replySwipe} />
                                                })
                                            }
                                            </>
                                            <div className='mt-4' ref={messagesEndRef} />
                                        </div>
                                    })
                                    }</>
                                </div>
                            </div>

                            {/* bottom bar */}
                            <BottomBar
                                input={state.input}
                                data={data}
                                reply={reply}
                                deselectAllTextItem={deselectAllTextItem}
                                onChangeInput={onChangeInput}
                                handleKeyDown={handleKeyDown}
                                sendMessageHandle={sendMessageHandle} />
                        </div>
                    </div>
                </>
            }
        </div>}</>

    )
}

export default ChatRoom;