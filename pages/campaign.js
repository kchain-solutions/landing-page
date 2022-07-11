import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import CustomTheme from "../components/CustomTheme";
import { GlobalContext } from "../components/GlobalContext";
import EthereumNavbar from "../components/EthereumNavbar";
import CampaignFactoryBody from "../components/CampaignFactoryBody";

export default function campaign(props) {

    const [localState, setLocalState] = useState({

    });
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const router = useRouter();
    const { campaignAddress } = router.query;

    useEffect(() => {
        setGlobalState({
            ...globalState,
            currentPage: "ethereum.js"
        })
        globalState.web3;
    }, []);

    if (campaignAddress) {
        return <>
            <CustomTheme>
                <EthereumNavbar noLimitFactoryAddress={props.noLimitFactoryAddress} scarsityFactoryAddress={props.scarsityFactoryAddress} />
                <Typography variant="body"> {campaignAddress} </Typography>
            </CustomTheme>
        </>;
    }
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