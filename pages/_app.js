import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";



function MyApp({ Component, pageProps }) {

    const [globalState, setGlobalState] = useState({
        language: "en",
        apiBaseUrl: process.env.API_BASE_URL,
        isConnected: false,
        web3: undefined,
        wallet: ''
    });


    useEffect(() => {
        console.log('_app.js global loaded state');
    }, []);

    return (<>
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <title> Aliumind  </title>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    </>);
}

export default MyApp