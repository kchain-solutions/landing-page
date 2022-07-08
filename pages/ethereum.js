import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import CustomTheme from "../components/CustomTheme";
import { GlobalContext } from "../components/GlobalContext";
import EthereumNavbar from "../components/EthereumNavbar";

export default function Ethereum(props) {

    const [localState, setLocalState] = useState({

    });
    const { globalState, setGlobalState } = useContext(GlobalContext);

    useEffect(() => {
        setGlobalState({
            ...globalState,
            currentPage: "ethereum.js"
        })
        globalState.web3;
    }, []);

    return <>
        <CustomTheme>
            <EthereumNavbar noLimitFactoryAddress={props.noLimitFactoryAddress} scarsityFactoryAddress={props.scarsityFactoryAddress} />
            <Typography variant="h3"> Ethereum Demo </Typography>
            <Typography variant="h5"> WIP </Typography>
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