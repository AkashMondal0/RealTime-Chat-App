import React from 'react'
import { Input } from "@material-tailwind/react";
import { Progress } from "@material-tailwind/react";

const ShareModal = ({ data, ReSetValue, uploadPhotoHandle, filePicker, sendMessageHandle }) => {
    const { setCaption, progress, img, caption, work } = data
    return (
        <>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-96 max-w-5xl" id='style-3'>

                    <><label htmlFor="my-modal-5" className="btn btn-outline btn-error btn-sm btn-circle absolute right-2 top-2" onClick={ReSetValue}>✕</label>
                        <h3 className="font-bold text-lg mb-3">Your Photos <>{img?.length}</></h3>

                        <div className="flex items-center justify-center w-full">
                            {img == "" ? <label htmlFor="myfile" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {/* <div className="radial-progress" style={{progress:70}}>{progress}</div> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-3 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">You can send Maximum 4 Photos</p>
                                </div>
                                <input type="file" multiple id="myfile" name="myfile" className="hidden" value={img} onChange={filePicker} />
                            </label>
                                :
                                <div>
                                    {/* <div className="radial-progress" style={{progress:70}}>{progress}</div> */}
                                    {img?.map((item, index) => {
                                        return <img key={index} className="mb-3 rounded-3xl text-gray-400 my-3" src={URL.createObjectURL(item)} />
                                    })}

                                    {/* <label htmlFor="myfile" className="flex items-center justify-center cursor-pointer">
                                        <div className="flex flex-row hover:bg-gray-100 rounded-xl p-2 justify-center h-10">
                                            <div className='flex items-center justify-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                </svg>
                                                <input multiple type="file" id="myfile" name="myfile" className="hidden" onChange={photoSendHandle} />
                                                <div className="px-2 text-md font-semibold text-gray-600">Change Photo</div>
                                            </div>
                                        </div>
                                    </label> */}
                                </div>}
                        </div>
                        {progress > 0 && <Progress value={progress} label="Completed" />}
                        <div className="w-full mt-10 mb-4">
                            <Input variant='standard' minLength={2} label="Caption (Optional)" value={caption} onChange={(e) => { setCaption(e.target.value) }} />
                        </div>
                        {progress == 0 && <button onClick={uploadPhotoHandle} className="cursor-pointer relative p-4 px-6 py-3 overflow-hidden font-medium border-2 shadow-md group inline-flex items-center justify-center h-12 w-full rounded-3xl transition duration-500 ease-in-out text-gray-500 focus:outline-none  bg-blue-500 hover:bg-blue-400">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <></>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                                <>Send items {img?.length}</>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </span>
                            <span className="relative invisible"></span>
                        </button>}


                        <label htmlFor="my-modal-5">{progress == 100 && <div onClick={sendMessageHandle} className="cursor-pointer relative p-4 px-6 py-3 overflow-hidden font-medium border-2 shadow-md group inline-flex items-center justify-center h-12 w-full rounded-3xl transition duration-500 ease-in-out text-gray-500 focus:outline-none  bg-green-500 hover:bg-green-400">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease bg-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Done
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                                Send
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </span>
                        </div>}</label>
                    </>
                </div>
            </div>
        </>

    )
}

export default ShareModal