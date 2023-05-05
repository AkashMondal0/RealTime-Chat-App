import React from 'react'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import Format from '../timeFormat/timeFormat';

export const ChatCardAuthorSide = ({ selectTextItem, message, width, data, setSelectedPhoto, replySwipe }) => {

    return (
        <SwipeableList key={message.id}>
            {({ className, ...rest }) => (
                <div className='w-full flex justify-end rounded-full'>
                    <SwipeableListItem
                        swipeLeft={{
                            content: <div>Reply</div>,
                            action: () => replySwipe({ id: message.id, text: message.message, img: message.img })
                        }}
                        // swipeRight={{
                        //     content: <div>Reply</div>,
                        //     action: () => replySwipe({ id: message.id, text: message.message, img: message.img })
                        // }}
                        {...rest}
                    >
                        <div id={message.id} className={`w-full py-3 my-3 rounded-lg animate__animated animate__backInRight`} key={message.id}>
                            <div className="flex items-center justify-start flex-row-reverse">
                                {width < 768 ? <></> : <><div className="avatar mx-2">
                                    <div className="w-10 rounded-full">
                                        <img src={data?.profilePicture || "/no-user.jpg"} />
                                    </div>
                                </div></>}

                                <div className="relative mr-2 text-sm bg-indigo-100 p-2 shadow rounded-xl">
                                    {/* image section */}
                                    {message.img !== null ?
                                        <label onClick={() => { setSelectedPhoto(message.img); }} htmlFor="PhotoModal" className='cursor-pointer'>
                                            {message.img?.length > 1 ? <div className='w-64 h-80 justify-center flex flex-wrap m-1'>
                                                {message.img?.map((item, index) => {
                                                    return <img key={index} src={item} className={`w-32 rounded-xl mb-2 h-40 p-1`} />;
                                                })}
                                            </div>
                                                : <>
                                                    <img src={message.img} className={`w-64 rounded-xl mb-2 h-80 object-cover`} />
                                                </>}
                                            <div className='px-4  text-base' style={{ "maxWidth": "13rem" }}>
                                                {message.caption}
                                            </div>
                                        </label>
                                        : // reply section
                                        <>
                                            {message.replyId !== null ? <>
                                                <div className='px-1' style={{ "maxWidth": "13rem" }}
                                                >
                                                    {"You"}
                                                    <div
                                                    >
                                                        <a href={`#${message.replyId}`}>
                                                            {message.replyText !== null ? <p className='bg-white rounded-lg border px-4 py-1 m-1'>{message.replyText}</p> : <img className="w-20 h-20 object-cover rounded-xl m-1" src={message.replyImg} />}
                                                        </a>

                                                    </div>
                                                    {message.message}
                                                </div>
                                            </> : <>
                                                {/* single message */}
                                                <div className='px-6' style={{ "maxWidth": "13rem" }}>
                                                    {message.message}
                                                </div>
                                            </>}
                                        </>}
                                    {/* time section */}
                                    <div className="absolute text-xs bottom-0 left-0 -mb-6 mr-2 text-gray-500">
                                        {Format.Time(message.timestamp?.seconds) || "........"}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwipeableListItem>
                </div>
            )}
        </SwipeableList>
    )
}

export const ChatCardUserSide = ({ selectTextItem, message, width, data, setSelectedPhoto, replySwipe }) => {

    return (
        <SwipeableList key={message.id}>
            {({ className, ...rest }) => (
                <>
                    <SwipeableListItem
                        // swipeLeft={{
                        //     content: <div>Reply</div>,
                        //     action: () => replySwipe({ id: message.id, text: message.message, img: message.img })
                        // }}
                        swipeRight={{
                            content: <div>Reply</div>,
                            action: () => replySwipe({ id: message.id, text: message.message, img: message.img })
                        }}
                        {...rest}
                    >
                        <div
                            onDoubleClick={() => { selectTextItem({ mid: message.id, text: message.message, img: message.img }); }}
                            id={message.id} className={`flex w-full py-3 my-3 rounded-2xl animate__animated animate__backInLeft `} key={message.id}>

                            <div className="flex flex-row items-center">
                                {width < 768 ? <></> : <>
                                    <div className="avatar mx-2">
                                        <div className="w-10 rounded-full">
                                            <img src={data?.profilePicture || "/no-user.jpg"} />
                                        </div>
                                    </div></>}
                                <div className="relative ml-2 text-sm bg-white p-2 shadow rounded-xl">
                                    {message.img !== null ?
                                        <label onClick={() => { setSelectedPhoto(message.img); }} htmlFor="PhotoModal" className='cursor-pointer'>
                                            {message.img?.length > 1 ? <div className='w-64 h-80 justify-center flex flex-wrap m-1'>
                                                {message.img?.map((item, index) => {
                                                    return <img key={index} src={item} className={`w-32 rounded-xl mb-2 h-40 p-1`} />;
                                                })}
                                            </div>
                                                : <>
                                                    <img src={message.img} className={`w-64 rounded-xl mb-2 h-80 object-cover`} />
                                                </>}
                                            <div className='px-4  text-base' style={{ "maxWidth": "13rem" }}>
                                                {message.caption}
                                            </div>
                                        </label>
                                        : // reply section
                                        <>
                                            {message.replyId !== null ? <>
                                                <div className='px-4 ' style={{ "maxWidth": "13rem" }}
                                                >
                                                    {data?.username}
                                                    <div
                                                    >
                                                        <a href={`#${message.replyId}`}>
                                                            {message.replyText !== null ? <p className='bg-indigo-100 rounded-lg border px-4 py-1 m-1'>{message.replyText}</p> : <img className="w-20 h-20 object-cover rounded-xl m-1" src={message.replyImg} />}
                                                        </a>

                                                    </div>
                                                    {message.message}
                                                </div>
                                            </> : <>
                                                <div className='px-6' style={{ "maxWidth": "13rem" }}>
                                                    {message.message}
                                                </div>
                                            </>}
                                        </>}
                                    <div
                                        className="absolute text-xs bottom-0 right-0 -mb-6 mr-2 text-gray-500"
                                    >
                                        {Format.Time(message.timestamp?.seconds) || "........"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwipeableListItem>
                </>
            )}
        </SwipeableList>
    )
}
