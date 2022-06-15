import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import lang from "../lang/index.json"
import Box from '@mui/material/Box';
import { Container } from "@mui/system";


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
                <Container>
                    {localState?.contact}
                </Container>

            </Layout>
        </>);
}


export default Index