/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Alert } from '../alerts/'
import { Container } from './'

import API from '../../api'
import Spinner from '../spinner'

const AddBook = (props) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, errors } = useForm()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        console.log('BOOK FORM DATA', data)
        const res = await API.Book.addBook(data)
        if (res.error) {
            
            
        }else if (res.statusCode === 201){
            props.addStatus(true)
        }
        setLoading(false)
    }

    return (
        <>
            <Container>
            {error ? <Alert color={'red'} outlined={true} rounded>{message}</Alert> : ''}
                <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col text-sm mb-4 w-full">   
                         <span className="text-xl text-blue-500">Add a New Book</span>                  
                        {/* input */}
                        <div className="w-full mb-4">
                            <label className="block">
                                <span className="text-default">Title <span className="text-red-500">*</span></span>
                                <input
                                    name="title"
                                    type="text"
                                    ref={register({ required: true })}
                                    className="form-input mt-1 text-xs block w-full bg-white"
                                    placeholder={'Enter your book title'}
                                />
                            </label>
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">Book Title is required</p>
                            )}
                        </div>
                        {/* input */}
                        <div className="w-full mb-4">
                            <label className="block">
                                <span className="text-default"> Category <span className="text-red-500">*</span></span>
                                <input
                                    name="category"
                                    type="text"
                                    ref={register({ required: true })}
                                    className="form-input mt-1 text-xs block w-full bg-white"
                                    placeholder={'Category'}
                                />
                            </label>
                            {errors.pages && (
                                <p className="mt-1 text-xs text-red-500">Category is required</p>
                            )}
                        </div>
                        {/* input */}
                        <div className="w-full mb-4">
                            <label className="block">
                                <span className="text-default"> Number of pages <span className="text-red-500">*</span></span>
                                <input
                                    name="pages"
                                    type="number"
                                    ref={register({ required: true })}
                                    className="form-input mt-1 text-xs block w-full bg-white"
                                    placeholder={'Number of pages'}
                                />
                            </label>
                            {errors.pages && (
                                <p className="mt-1 text-xs text-red-500">Number of Pages is required</p>
                            )}
                        </div>
                        <div className="w-full">
                        <button className="flex bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">

{loading ? <Spinner height={5} margin={'mx-1'} width={5} topBorderColor="#fff" /> : ''} <span>Add</span>
</button>

                        </div>
                    </form>              
            </Container>
        </>
    )
}

export default AddBook
