// This file is used to call the api for login
import axios from "axios"
import uploadFileApi from "./Upload_Api"
import Alert from "../components/alert/alert";
import UserDataApi from "./UserData_Api";

// user login api
const LoginApi = async (data) => {

    const userCredential = {
        email: data.email,
        password: data.password
    }
    try {
        const loginRes = await axios.post(process.env.apikey + `/auth/login`, userCredential)

        if (loginRes.data.status == true) {
            localStorage.setItem("userToken", JSON.stringify(loginRes.data.token))
            return loginRes.data.token
        }
        else {
            Alert.ErrorAlert(loginRes.data.message)
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

// user register api
const register = async (data) => {
    const { username, email, password} = data
    // console.log(username, email, password)

    const res = await axios.post(process.env.apikey + "/auth/register", {username, email, password})

    if (res.data.status == true) {
        localStorage.setItem("userToken", JSON.stringify(res.data.token))
        return res.data
    } else {
        Alert.ErrorAlert(res.data.message)
        return false
    }
}

const getUserData = async (userToken) => {
    // console.log(userToken)
    try {
        const res = await axios.post(process.env.apikey + "/auth/getUserData", {}, {
            method: "POST",
            headers: {
                "auth-token": `${userToken}`,
                "content-type": "application/json"
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
const AuthApi = { LoginApi, register, getUserData }

export default AuthApi