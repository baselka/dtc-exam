import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useForm } from 'react-hook-form'
import Spinner from '../spinner'
import Link from 'next/link'
import { registerUser } from '../../actions/register'


const Registeration = () => {
  const dispatch = useDispatch()
  const { registerLoading } = useSelector(
    state => ({
      registerLoading: state.register.registerLoading,
    }),
    shallowEqual
  )
  const { register, handleSubmit, watch, errors } = useForm()
  const [error, setError] = useState(null)
  const onSubmit = data => {
    
    if (data.password !== data.password2) {
      setError('Passwords does not match')
      return
    }
    setError(null)
     dispatch(registerUser(data))
    
  }
  return (
    <>
      {error ? <p className="text-red-700">{error}</p> : ''}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4">
        {/* input */}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Your Name</span>
            <input
              name="name"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your name"
            />
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">Email is required</p>
          )}
        </div>
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
        {/* input */}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Retype Password <span className="text-red-500">*</span></span>
            <input
              name="password2"
              type="password"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Retype your password"
            />
          </label>
          {errors.password2 && (
            <p className="mt-1 text-xs text-red-500">Confirm Password is required</p>
          )}

        </div>
        <div className="flex items-center justify-between">
          <button className="flex bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">

            {registerLoading ? <Spinner height={5} margin={'mx-1'} width={5} topBorderColor="#fff" /> : ''} <span>Sign Up</span>
          </button>
        </div>
        <span>
          <Link href="/">
            <a className="link">
              Login here
                        </a>
          </Link>
        </span>

      </form>
    </>
  )
}

export default Registeration