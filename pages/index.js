import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import CustomTheme from "../components/CustomTheme";
import { GlobalContext } from "../components/GlobalContext";
import EthereumNavbar from "../components/EthereumNavbar";
import CampaignFactoryBody from "../components/CampaignFactoryBody";

export default function Index(props) {

    const [localState, setLocalState] = useState({

    });
    const { globalState, setGlobalState } = useContext(GlobalContext);

    useEffect(() => {
        setGlobalState({
            ...globalState,
            currentPage: "index.js"
        });
        
    }, []);

    useEffect(() => {
        console.log("ipfs instance", props.ipfsInstance);
    }, [props]);

    return <>
        <CustomTheme>
            <EthereumNavbar noLimitFactoryAddress={props.noLimitFactoryAddress} scarsityFactoryAddress={props.scarsityFactoryAddress} />
            <CampaignFactoryBody />
        </CustomTheme>
    </>;
}

export async function getStaticProps() {
    const baseUrl = process.env.API_BASE_URL;
    const noLimitFactoryAddress = process.env.CAMPAIGN_NOLIMIT_FACTORY_RINKEBY;
    const scarsityFactoryAddress = process.env.CAMPAIGN_SCARSITY_FACTORY_RINKEBY;
    return {
        props: {
            baseUrl,
            noLimitFactoryAddress,
            scarsityFactoryAddress
        }
    }
}