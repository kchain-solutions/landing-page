import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import lang from "../lang/index.json"
import Box from '@mui/material/Box';


function Index() {

    const [localState, setLocalState] = useState();
    const { globalState, setGlobalState } = useContext(GlobalContext);

    useEffect(() => {
        setLocalState({
            "contact": lang[globalState.language]["service1"]
        });
    }, []);

    return (
        <>
            <Layout>
                <Navbar />
                <Box>
                {localState?.contact}
                </Box>
            </Layout>
        </>);
}


export default Index