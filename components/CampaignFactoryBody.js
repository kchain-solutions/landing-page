import React, { useState, useContext, useEffect } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import { Events } from "./Events"
import { GlobalContext } from "./GlobalContext";
import CampaignCardList from "./CampaignCardList";

import CampaignNoLimitBuild from "../build/contracts/CampaignNoLimit.json"
import CampaignScarsityBuild from "../build/contracts/CampaignScarsity.json"


export default function CampaignFactoryBody() {

    const [localState, setLocalState] = useState({
        campaignTableStorage: {}
    });
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const { event, setEvent } = useContext(Events);

    let campaignAddresses = [];
    let campaignTableStorage = {};
    let campaignNoLimitInstance = undefined;
    let campaignScarsityInstance = undefined;

    const loadData = async (web3, CampaignNoLimitFactoryInstance) => {
        campaignAddresses = await CampaignNoLimitFactoryInstance.methods.getCampaigns().call();
        let tmpObj = {};
        for (let address of campaignAddresses) {
            if (campaignTableStorage['address']) {
                campaignTableStorage['address'] =  {
                    ...campaignTableStorage['address'],
                    remaningOffers: await campaignNoLimitInstance.methods.remaningOffers().call()
                }
                continue;
            }

            campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, address);
            let name = await campaignNoLimitInstance.methods.name().call();
            let symbol = await campaignNoLimitInstance.methods.symbol().call();
            let owner = await campaignNoLimitInstance.methods.admin().call();
            let type = 'NoLimit';
            let remaningOffers = await campaignNoLimitInstance.methods.remaningOffers().call();
            tmpObj = { name, symbol, owner, type, remaningOffers }
            campaignTableStorage[address] = tmpObj;
        }
        console.log('campaign data loaded ', campaignTableStorage);
        setLocalState({ campaignTableStorage });
        localStorage.setItem('campaignTableStorage', JSON.stringify(campaignTableStorage));

    }

    useEffect(() => {
        console.log('Campaign factorybody globalstate []', globalState);
        campaignTableStorage = JSON.parse(localStorage.getItem('campaignTableStorage'));
        if (!campaignTableStorage)
            campaignTableStorage = {};
        if (globalState?.isConnected) {
            loadData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
        }
    }, []);

    useEffect(() => {
        if (globalState?.isConnected) {
            loadData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
        }
        console.log('campaign factory localstate', localState.campaignTableStorage);
    }, [globalState]);

    useEffect(() => {
        if (event.type = "newCampaign") {
            if (globalState?.isConnected) {
                loadData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
            }
            console.log('campaign factory localstate', localState.campaignTableStorage);
        }
    }, [event]);

    if (globalState?.isConnected) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item md={8} sx={{ display: { xs: "none", md: 'flex' } }}>
                        <CampaignCardList campaignTableStorage={localState.campaignTableStorage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography> Button placeholder</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: { sx: 'flex', md: "none" } }}>
                        <CampaignCardList campaignTableStorage={localState.campaignTableStorage} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
    else {
        return (<Typography variant="h4">Connect your wallet!</Typography>);
    }

}