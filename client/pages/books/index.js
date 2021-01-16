/* eslint-disable react/prop-types */
/* eslint-disable padded-blocks */
/* eslint-disable react/display-name */
import React, { useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Icon from 'react-feather'
import Datatable from '../../src/components/datatable'
import API from '../../src/api'
import Modal from '../../src/components/modals'
import Spinner from '../../src/components/spinner'
import Router, { useRouter } from 'next/router'
import { logoutUser } from '../../src/actions/auth'
import { AddBook, EditBook } from '../../src/components/book'

const Index = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(
        state => ({
            isAuthenticated: state.auth.isAuthenticated,
        }),
        shallowEqual
    )
    useEffect(() => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            Router.push('/')
        }
    }, [])

    const textInput = createRef()
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [bookAdded, setBookAdded] = useState(false)
    const [bookEdited, setBookEdited] = useState(false)
    const [message, setMessage] = useState(null)
    const [bookToEdit, setBookToEdit] = useState([])
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [searchTitle, setSearchTitle] = useState(null)

    useEffect(() => {
console.log(bookEdited)
        fetchData()
        if (bookAdded) {
            toggleAddModal()
            setMessage('You Added New Book!')
        }
        if (bookEdited) {
            toggleModal()
            setMessage('You Updated a Book!')
        }
        setBookAdded(false)
        setBookEdited(false)
    }, [limit, offset, bookAdded, bookEdited])


    const searchByBook = (title) => {
        console.log('ONCHANEG', title.length)
        setSearchTitle(title)
        fetchData()
    }

    const logout = () => {
        dispatch(logoutUser())
    }


    const OrdersHistoryTable = () => {
        const columns = (toggleModal, removeBook) => React.useMemo(
            () => [
                {
                    Header: 'title',
                    accessor: 'title'
                },
                {
                    Header: 'number of pages',
                    accessor: 'pages'
                },
                {
                    Header: 'category',
                    accessor: 'category',

                },
                {
                    Header: 'Edit',
                    Cell: props => <button onClick={() => toggleModal(props.row.original)} >
                        <Icon.Edit2 size={20} color="green" />
                    </button>
                },
                {
                    Header: 'delete',
                    Cell: props => <button onClick={() => removeBook(props.row.original)} >
                        <Icon.Trash size={20} color="red" />
                    </button>
                }

            ],
            []
        )

        return <Datatable columns={columns(toggleModal, removeBook)}
            data={data}
            limit={limit}
            offset={offset}
            changeIndex={(pageIndex) => changePageIndex(pageIndex)}
            changePage={(pageSize) => changePageSize(pageSize)}
            loading={loading}
            pageCount={pageCount} />
    }

    const fetchData = async () => {

        setLoading(true)
        const pageOffset = limit * offset
        const formData = {
            page: offset,
            pageSize: limit
        }
        if(searchTitle === null ){
            const res = await API.Book.getAllBooks(formData)
            console.log('ALL Books', res.data)
            setData(res.data.books)
            setPageCount(Math.ceil(res.data.totalPages / limit))
        }else{
            const res = await API.Book.searchBook({title:searchTitle})
            setData(res.data.books)
            setPageCount(Math.ceil(res.data.totalPages / limit))
          
        }
       
        setLoading(false)

    }

    const toggleAddModal = () => {
        setAddModal(!addModal)
    }
    const toggleModal = async (item) => {

        setBookToEdit(item)
        setEditModal(!editModal)
    }
    const removeBook = async (item) => {

        const res = await API.Book.deleteBook({ book_id: item._id })
        if (res.statusCode === 200) {
            setMessage(res.data.message)
            fetchData()
        }
    }

    const changePageSize = (size) => {
        setLimit(size)
        changePageIndex('first')

    }
    const changePageIndex = (index) => {
        switch (index) {
            case 'next':
                setOffset(offset + 1)
                break
            case 'previous':
                setOffset(offset - 1)
                break
            case 'first':
                setOffset(0)
                break
            case 'last':
                setOffset(pageCount - 1)
                break

            default:
                break
        }

    }
    return (
        <>

            <div className="flex h-screen justify-center transform scale-5 md:scale-90 lg:scale-95 xl:scale-100">
                <div className="flex flex-col w-full p-8 overflow-y-auto  shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                    {message ? <p className="text-xl text-blue-500">{message}</p> : ''}
                    <div className="flex flex-row">
                        <div className="flex flex-row ...">
                            <div>
                                <button
                                    type="submit"
                                    className="flex flex-row px-2 py-2 uppercase btn-hover-effect justify-center items-cente font-bold mt-1 ml-2 w-full md:w-1/2 lg:w-full text-white bg-blue-700 rounded-md hover:bg-green-500 focus:outline-none active:outline-none"
                                    value="Add New"
                                    onClick={toggleAddModal}
                                > Add New </button>
                            </div>

                            <div className="ml-4">
                                <span className="text-default">Search Book</span>
                                <input
                                    name="search"
                                    type="text"
                                    ref={textInput}
                                    onChange={(e) => searchByBook(e.target.value)}
                                    className="form-input mt-1 ml-2 text-xs w-auto bg-white"
                                    placeholder="Search Book"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex flex-row px-2 py-2 uppercase btn-hover-effect justify-center items-cente font-bold mt-1 ml-2 w-full md:w-1/2 lg:w-full text-white bg-green-500 rounded-md hover:bg-blue-700 focus:outline-none active:outline-none"
                                    value="Search"
                                    onClick={searchByBook}
                                > {loading ? <Spinner height={5} width={5} margin={'mr-2'} /> : <Icon.Search color="white" />} Search </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex flex-row ml-10 px-2 py-2 uppercase btn-hover-effect justify-center items-cente font-bold mt-1 ml-2 w-full md:w-1/2 lg:w-full text-white bg-red-700 rounded-md focus:outline-none active:outline-none"

                                    onClick={logout}
                                > logout </button>
                            </div>

                        </div>
                    </div>

                    <OrdersHistoryTable />
                </div>
                <Modal isModalVisible={addModal} toggleModal={toggleAddModal} width="w-full">
                    <AddBook addStatus={(status) => setBookAdded(status)} />
                </Modal>
                <Modal isModalVisible={editModal} toggleModal={toggleModal} width="w-full">
                    <EditBook bookToEdit={bookToEdit} editStatus={(status) => setBookEdited(status)} />
                </Modal>
                {<span className="invisible">

                    {/*  */}
                </span>}
            </div>
        </>
    )
}
export default Index
