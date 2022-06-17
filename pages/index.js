import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import lang from "../lang/index.json"
import Box from '@mui/material/Box';
import { Container } from "@mui/system";

const axios = require('axios').default;

function Index() {

    const [localState, setLocalState] = useState({
        
    });
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const axiosCall = async (url) => {
        try {
            let response = await axios.get(url);
            console.log(response.data);
            setLocalState({
                ...localState,
                axiosData: response.data
            });

        } catch (error) {
            console.log('indexjs error',error)
        }
        
    } 
    useEffect(() => {
        setLocalState({
            service1: lang[globalState.language]["service1"]
        });

        console.log('Index page loaded');
        console.log(globalState.apiBaseUrl);
        axiosCall(globalState.apiBaseUrl + 'hello')   
    }, []);

    return (
        <>
            <Layout>
                <Navbar />
                <Container>
                    {localState?.axiosData?.text}
                </Container>

            </Layout>
        </>);
}


export default Index