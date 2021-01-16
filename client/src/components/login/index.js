import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useForm } from 'react-hook-form'
import Spinner from '../spinner'
import Link from 'next/link'
import { loginUser } from '../../actions/auth'


const Login = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, errors } = useForm()

  const { error, message, loading } = useSelector(
    state => ({
      error: state.auth.error,
      message: state.auth.message,
      loading: state.auth.loading
    }),
    shallowEqual
  )
  const onSubmit = data => {
    console.log(data)
    dispatch(loginUser(data))
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4">
        {/* input */}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Email address</span>
            <input
              name="email"
              type="email"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your email"
            />
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">Email is required</p>
          )}
        </div>
        {/* input */}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Password <span className="text-red-500">*</span></span>
            <input
              name="password"
              type="password"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your password"
            />
          </label>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">Password is required</p>
          )}

        </div>
      
        <div className="flex items-center justify-between">
          <button className="flex bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">

            {loading ? <Spinner height={5} margin={'mx-1'} width={5} topBorderColor="#fff" /> : ''} <span>Login</span>
          </button>
        </div>
        <span>
          <Link href="/registeration">
            <a className="link">
              Register Now !
            </a>
          </Link>
        </span>

      </form>
    </>
  )
}

export default Login