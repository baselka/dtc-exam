import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import SignIn from '../src/components/login'
import { Alert } from '../src/components/alerts/'
import Centered from '../src/layouts/centered'
const localStorage = require('../src/utils/localStorage')
import Router, { useRouter } from 'next/router'
const Index = () => {
  const dispatch = useDispatch()
  const { registerSuccess, registerMessage, error, message, isAuthenticated, user } = useSelector(
    state => ({
      registerSuccess: state.register.registerSuccess,
      registerMessage: state.register.registerMessage,
      isAuthenticated: state.auth.isAuthenticated,
      error: state.auth.error,
      message: state.auth.message,
      user: state.auth.user,
      loading: state.auth.loading
    }),
    shallowEqual
  )
useEffect(() =>{
if(isAuthenticated){
Router.push('/books')
}
}, [isAuthenticated])
  return (
    <Centered hieght={'h-screen'}>
      
      {registerSuccess ? <p className="text-blue-500 text-xl">{registerMessage}</p> : ''}
      {error ? <Alert color={'red'} outlined={true} rounded>{message}</Alert> : ''}
      <SignIn />
    </Centered>

  )
}

export default Index