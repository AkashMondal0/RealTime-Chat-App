import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import AuthPage from './AuthPage';
import MainChat from './MainChat';

const Index = () => {
  const AuthState = useContext(AuthContext)


  return AuthState?.state?.route == true ?
    <MainChat data={AuthState.state} /> : <AuthPage data={AuthState.state} />
}
export default Index
