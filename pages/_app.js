import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { Events } from "../components/Events";


function MyApp({ Component, pageProps }) {

    const [event, setEvent] = useState({
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
        wallet: '',
        ipfsInstance: undefined
    });


    useEffect(() => {
        console.log('_app.js global state and Events loaded');
        console.log('env variable ');
        
    }, []);

    return (<>
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <Events.Provider value={{ event, setEvent }}>
                <title> Karma  </title>
                <Component {...pageProps}/>
            </Events.Provider>
        </GlobalContext.Provider>
    </>);
}

// export async function getStaticProps() {
//     const baseUrl = process.env.API_BASE_URL;
//     const noLimitFactoryAddress = process.env.CAMPAIGN_NOLIMIT_FACTORY_RINKEBY;
//     const scarsityFactoryAddress = process.env.CAMPAIGN_SCARSITY_FACTORY_RINKEBY;
//     const ipfsInstance = "ipfs placeholder";
//     return {
//         props: {
//             baseUrl,
//             noLimitFactoryAddress,
//             scarsityFactoryAddress,
//             ipfsInstance
//         }
//     }
// }

export default MyApp;


