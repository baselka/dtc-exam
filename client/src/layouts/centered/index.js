/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Logo from './logo'
import Head from 'next/head'

export const Centered = ({ children, hieght }) => {
   
    return (
        <>
            <Head>
                <title>{'DTC MERN EXAM'}</title>
            </Head>
            <div
                data-background="white"
                data-logo="white"
                data-direction={'ltr'}
                className={`text-gray-900 centered  ${hieght}  flex items-center justify-center bg-gray-100 text-sm`}>
                <div className="w-full m-2 p-4 lg:w-1/3 lg:m-0 lg:p-8 bg-white shadow-lg">
                    <Logo />
                    {children}
                </div>
            </div>
        </>
    )
}

export default Centered
