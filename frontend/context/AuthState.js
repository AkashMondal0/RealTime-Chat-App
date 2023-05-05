import React, { useEffect, useReducer } from 'react'
import AuthContext from './AuthContext'
import UserDataApi from '../service/UserData_Api';
import AuthApi from '../service/Auth_Api';

let getLocalStorageData = () => {
    if (typeof window !== "undefined") {
        let userToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')) : false;
        return userToken
    }
}

const initialState = {
    Author: null,
    userFriends: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    route: false,
    splash: true
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                Author: action.payload,
                userFriends: action.otherData,
                isAuthenticated: true,
                loading: false,
                error: null,
                route: true,
                splash: false
            }
            return state
        case "LOGOUT":
            localStorage.removeItem("userToken")
            state = {
                Author: null,
                userFriends: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                route: false
            }
            return state
        case "REFRESH_FRIENDS":
            let res = action.payload
            state = {
                ...state,
                userFriends: res
            }
            return state
        case "SET_SPLASH":
            state = {
                ...state,
                splash: action.payload
            }
            return state
        default:
            return state
    }
}

const AuthState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const tokenLocal = getLocalStorageData()


    const StartApp = async (token) => {
        console.log("StartApp")
        const userGetData = await AuthApi.getUserData(token||tokenLocal) // get user data from server
        const user = userGetData.userData

        const res = await UserDataApi.fetchFriends(user._id) // get user friends from server

        dispatch({ // set user data to context
            type: "LOGIN",
            payload: user,
            otherData: res,
        })
    }


    useEffect(() => {
        setTimeout(() => {
            if (!getLocalStorageData() == false) {
                StartApp(tokenLocal) // if user is logged in, get user data from server
            }
            else {
                dispatch({ // if user is not logged in, set splash to false and show login page
                    type: "SET_SPLASH",
                    payload: false
                })
            }
        }, 1000);
    }, [])

    return (
        <AuthContext.Provider value={{
            state,
            dispatch,
            StartApp
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;