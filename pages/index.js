import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import CustomTheme from "../components/CustomTheme";
import Navbar from "../components/Navbar";
import Body from "../components/BodyLandingPage";
import lang from "../lang/index.json"

import { Container } from "@mui/system";

const axios = require('axios').default;

function Index(props) {

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
            console.log('indexjs error', error)
        }

    }
    useEffect(() => {
        setLocalState({
            service1: lang[globalState.language]["service1"]
        });

        console.log('Index page loaded');
        console.log('apiBaseUrl', props.url);
        axiosCall('/api/hello')
    }, []);

    return (
        <>
            <CustomTheme>
                <Navbar />
                <Body />
                {props.url}
                <p>{localState?.axiosData?.text}</p>
            </CustomTheme>
        </>);
}



export default Index

export async function getStaticProps() {
    const url = process.env.API_BASE_URL 
    return{
        props: {
            url
        }
    }
  }
  