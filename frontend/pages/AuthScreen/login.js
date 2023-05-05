import React, { useContext, useState } from 'react'
import Loading, { Loading2 } from '../../components/loading/loading';
import AuthContext from '../../context/AuthContext';
import AuthApi from '../../service/Auth_Api';
import UserDataApi from '../../service/UserData_Api';


const Login = ({ setToggle }) => {
    const AuthState = useContext(AuthContext)
    const [state, setState] = useState({
        email: "",
        password: "",
        loading: false,
        err: true
    })


    const submitHandle = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true })
        // login api call And return user token
        const token = await AuthApi.LoginApi(state)

        if (token !== false) {
            AuthState.StartApp(token)
        }

        setState({ ...state, loading: false })
    };


    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3" style={{ "backgroundImage": "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Sky Chat</h2>

                            <div className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Sky Chat</h2>

                            <div className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</div>
                        </div>

                        <div className="mt-8">
                            <form onSubmit={submitHandle}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input required onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">{state.err == false ? <div className='text-red-700'>{state.err}</div> : "Password"}</label>
                                        <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                    </div>

                                    <input required minLength={6} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div className="mt-6">
                                    <button type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        <div className='flex justify-center'>
                                            {state.loading == false ? <>Sign in</> : <Loading2 />}
                                        </div>
                                    </button>
                                </div>

                            </form>

                            <div className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <div className="text-blue-500 cursor-pointer"
                                onClick={() => { setToggle(true) }}>Sign up</div>.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
