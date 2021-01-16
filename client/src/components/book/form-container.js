/* eslint-disable react/prop-types */
import React from 'react'

const Container = ({ children }) => {
    return (
        <>
            <div className="flex flex-col rounded-md shadow lg:shadow-2xl bg-gray-200 w-4/6 lg:w-5/6 py-10 px-5 sm:px-2 md:px-20 lg:px-20 xl:px-20 my-6 shadow-sm">
                {children}
            </div>
        </>
    )
}

export default Container
