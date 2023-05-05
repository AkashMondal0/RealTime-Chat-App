import React, { useState, useContext, useRef } from 'react'
import { Loading2 } from '../../components/loading/loading';
import AuthContext from '../../context/AuthContext';
import AuthApi from '../../service/Auth_Api';
import uploadFileApi from '../../service/Upload_Api';
import UserDataApi from '../../service/UserData_Api';


const Signup = ({ setToggle }) => {
    const AuthState = useContext(AuthContext)
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: null,
        coverPicture: null,
        loading: false,
    })

    const submitHandle = async (e) => {
        e.preventDefault();

        let fun = async (token, uid) => {
            const res = await uploadFileApi.uploadFile(state.profilePicture)
            const data = { profilePicture: res, userId: uid }
            // console.log(res)
            await UserDataApi.updateUserData(uid, data)
            AuthState.StartApp(token)
            setState({ ...state, loading: false })
        }

        /// loading
        setState({ ...state, loading: true })
        // register api
        const res = await AuthApi.register(state)
        if (res !== false) {
            // console.log("register success")
            fun(res.token, res.userId)
        } else {
            setState({ ...state, loading: false })
        }

    };
    return (
        <div>
            <div className="bg-white dark:bg-gray-900">
                <div className="flex justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/3" style={{ "backgroundImage": "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
                        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                            <div>
                                <h2 className="text-4xl font-bold text-white">Sky Chat</h2>

                                <div className="max-w-xl mt-3 text-gray-300">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    In autem ipsa, nulla laboriosam dolores,
                                    repellendus perferendis libero suscipit nam temporibus molestiae
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Sky Chat</h2>

                                <div className="mt-3 text-gray-500 dark:text-gray-300">Sign Up</div>
                            </div>

                            <div className="mt-8">
                                <form onSubmit={submitHandle}>
                                    <div className="flex items-center space-x-6 mb-4">
                                        <div className="shrink-0">
                                            {state.profilePicture == null ? <img className="object-cover w-16 h-16 rounded-full" src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png" alt="profile photo" /> :
                                                <img className="object-cover w-16 h-16 rounded-full" src={URL.createObjectURL(state.profilePicture)} />}
                                        </div>
                                        <label htmlFor='myfile' className="px-5 py-2.5 font-bold bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-full text-sm">
                                            Upload Photo
                                        </label>
                                        <input type="file" className="hidden" id="myfile" name="myfile" onChange={(e) => { setState({ ...state, profilePicture: e.target.files[0] }) }} />
                                    </div>
                                    <div className="mt-6">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Name</label>
                                            <input required onChange={(e) => { setState({ ...state, username: e.target.value }) }} type="text" name="name" id="name" placeholder="Enter Your Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                            <input required onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                            <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                        </div>

                                        <input required minLength={6} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className="mt-6">
                                        <button type="submit"
                                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            <div className='flex justify-center'>
                                                {state.loading == false ? <>Sign Up</> : <Loading2 />}
                                            </div>
                                        </button>
                                    </div>

                                </form>

                                <div className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <div className="text-blue-500 cursor-pointer"
                                    onClick={() => { setToggle(false) }}>Sign In</div>.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup

