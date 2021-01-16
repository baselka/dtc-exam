import { Handle } from 'rc-slider'
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import * as Icon from 'react-feather'

const ModalHeader = ({ onClick, headerTitle, hideFooter }) => (
    <div className="modal-header">
        <h3 className="text-xl font-semibold">{headerTitle}</h3>
        {hideFooter
            ? ''
            : <button
                className="modal-close btn btn-transparent"
                onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={'text-secondary stroke-current inline-block h-5 w-5'}>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>}
    </div>
)

const ModalBody = ({ children }) => (
    <div className="relative p-4 flex-auto">

        {children}

    </div>
)

const ModalFooter = ({ onClick, showSave, isCart }) => (
    <div className="modal-footer children-x-2">
        <button className="btn btn-default btn-red" type="button" onClick={onClick}>
      Cancel
        </button>
        {showSave
            ? <button
                className="btn btn-default btn-green btn-rounded"
                type="button"
                onClick={onClick}>
                Save Changes
            </button>
            : null}
        {isCart
            ? <div className="inline-flex">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Prev
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next
                </button>
            </div> : null}
    </div>
)

const Modal = ({ children, buttonName, showSave, headerTitle, width, isEdit, buttonColor, success, toggleModal, isModalVisible, hideFooter }) => {
    const [hidden, setHidden] = useState(true)
    const handleModal = () => {
        toggleModal()
        setHidden(true)
    }
    return (
        <>
            {console.log(success)}
            <button
                className={`btn btn-default btn-${buttonColor || 'blue'} btn-rounded`}
                type="button"
                onClick={() => setHidden(false)}>
                {isEdit ? <span className="flex justify-center"><Icon.Edit size={20} /> {buttonName}</span> : buttonName}
            </button>
            {!hidden || isModalVisible ? (
                <>
                    <div className="backdrop fade-in fixed inset-0 z-40 bg-black"></div>
                    <div className="modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className={`relative ${width || 'w-auto'} my-4 mx-auto max-w-lg`}>
                            <div className="modal-content">
                                <ModalHeader headerTitle={headerTitle} onClick={toggleModal ? () => handleModal() : () => setHidden(true)} hideFooter={hideFooter}/>
                                <ModalBody >{children}</ModalBody >
                                {hideFooter
                                    ? ''
                                    : <ModalFooter showSave={showSave} onClick={toggleModal ? () => handleModal() : () => setHidden(true)} ></ModalFooter>}

                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Modal
