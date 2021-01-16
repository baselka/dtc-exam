import React, { useEffect } from 'react'
import { useSelector, shallowEqual, Provider } from 'react-redux'
import Head from 'next/head'
import { initializeStore, wrapper } from '../src/store'
import Router from 'next/router'
import NProgress from 'nprogress'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import '../src/scss/_components.scss'
import "tailwindcss/tailwind.css";

import '../src/scss/react-notifications.scss'


Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
const store = initializeStore()
const persistor = persistStore(store)

const MyApp = ({ Component, pageProps }) => {
    return (
        <div>
        
                <Provider store={store}>

                    <Head>
                        <title>DTC MERN EXAM</title>
                        <link rel="icon" href="/images/logo.png" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=no"
                        />
                        <script src="https://unpkg.com/feather-icons/dist/feather.min.js"> </script>
                    </Head>
                    <PersistGate loading={null} persistor={persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
         
        </div>
    )
}

export default wrapper.withRedux(MyApp)
