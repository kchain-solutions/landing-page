import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { Events } from "../components/Events";


function MyApp({ Component, pageProps }) {

    const [event, SetEvent] = useState({
        type: undefined,
        eventDate: undefined,
        message: undefined,
        data: {}
    });
    const [globalState, setGlobalState] = useState({
        language: "en",
        apiBaseUrl: process.env.API_BASE_URL,
        currentPage: "index.js",
        isConnected: false,
        web3: undefined,
        wallet: ''
    });


    useEffect(() => {
        console.log('_app.js global state and Events loaded');
        console.log('env variable ', process.env.API_BASE_URL)
    }, []);

    return (<>
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <Events.Provider value={{ event, SetEvent }}>
                <title> Karma  </title>
                <Component {...pageProps} />
            </Events.Provider>
        </GlobalContext.Provider>
    </>);
}

export default MyApp
