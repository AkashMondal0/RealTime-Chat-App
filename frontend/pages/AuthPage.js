import React, { useState } from 'react'
import Login from './AuthScreen/login'
import Signup from './AuthScreen/signup'
import Splash from '../components/loading/splash'

const AuthPage = ({ data }) => {
    const [toggle, setToggle] = useState(false)
    return (
        <>{
            data?.splash ? <Splash/>: <div>
                {toggle == false ? <Login setToggle={setToggle} /> : <Signup setToggle={setToggle} />}
            </div>
        }</>
    )
}

export default AuthPage
