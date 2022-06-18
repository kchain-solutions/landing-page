import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";



function MyApp({ Component, pageProps }) {

    const [globalState, setGlobalState] = useState({
        language: "en",
        apiBaseUrl: process.env.API_BASE_URL,
        currentPage: "index.js",
        isConnected: false,
        web3: undefined,
        wallet: ''
    });


    useEffect(() => {
        console.log('_app.js global loaded state');
        cosole.log(process.env.API_BASE_URL)
    }, []);

    return (<>
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <title> Karma  </title>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    </>);
}

export default MyApp