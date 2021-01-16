/* eslint-disable react/prop-types */
import React from 'react'

const Spinner = ({ height, width, margin, topBorderColor }) => {
    const backgroundColor = {
        borderTopColor: '#005'
    }

    return (
        <>
            <div style={backgroundColor} className={`loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${margin} h-${height} w-${width}`}></div>

        </>
    )
}

export default Spinner
