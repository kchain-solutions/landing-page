import React, { useState, useContext, useEffect } from "react";
import { Typography, Box, Grid, Container, TextField } from "@mui/material";
import { Events } from "./Events"
import { GlobalContext } from "./GlobalContext";
import CampaignCardList from "./CampaignCardList";

import CampaignNoLimitBuild from "../build/contracts/CampaignNoLimit.json"
import CampaignScarsityBuild from "../build/contracts/CampaignScarsity.json"
import CampaignAddNew from "./CampaignAddNew";
const Web3 = require('Web3');


export default function CampaignFactoryBody() {

    const [localState, setLocalState] = useState({
        campaignTableStorage: {}
    });

    const [searchValue, setSearchValue] = useState('');
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const { event, setEvent } = useContext(Events);

    let campaignAddresses = [];
    let campaignTableStorage = {};
    let campaignNoLimitInstance = undefined;
    let campaignScarsityInstance = undefined;

    const loadNoLimitData = async (web3, CampaignNoLimitFactoryInstance) => {
        campaignTableStorage = JSON.parse(localStorage.getItem('campaignTableStorage'));
        if(!campaignTableStorage)
            campaignTableStorage = {};
        campaignAddresses = await CampaignNoLimitFactoryInstance.methods.getCampaigns().call();
        let tmpObj = {};
        for (let address of campaignAddresses) {
            campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, address);
            if (campaignTableStorage[address]) {
                let remaningOffers = await campaignNoLimitInstance.methods.remaningOffers().call();
                campaignTableStorage[address] = {
                    ...campaignTableStorage[address],
                    remaningOffers
                }
                continue;
            }
            let name = await campaignNoLimitInstance.methods.name().call();
            let symbol = await campaignNoLimitInstance.methods.symbol().call();
            let owner = await campaignNoLimitInstance.methods.admin().call();
            let productPrice = await campaignNoLimitInstance.methods.productPrice().call();
            productPrice = Web3.utils.fromWei(productPrice, "ether");
            let type = 'NoLimit';
            let remaningOffers = await campaignNoLimitInstance.methods.remaningOffers().call();
            tmpObj = { name, symbol, owner, type, remaningOffers, productPrice }
            campaignTableStorage[address] = tmpObj;
        }
        
        localStorage.setItem('campaignTableStorage', JSON.stringify(campaignTableStorage));
        //research filter
        if (searchValue.length > 0) {
            let keys = Object.keys(campaignTableStorage);
            let differenceKeys = [];
            let matchedKeys = keys.map((key) => {
                let nameLowerCase = campaignTableStorage[key]?.name.toLowerCase();
                let symbolLowerCase =  campaignTableStorage[key]?.symbol.toLowerCase();
                let searchValueToLower = searchValue.toLowerCase();
                let keyToLower = key.toLowerCase();
                let ownerToLower = campaignTableStorage[key]?.owner.toLowerCase();
                if (nameLowerCase.includes(searchValueToLower)) {
                    return key;
                }
                if (symbolLowerCase.includes(searchValueToLower)) {
                    return key;
                }
                if (ownerToLower.includes(searchValueToLower)) {
                    return key;
                }
                if (keyToLower.includes(searchValueToLower)) {
                    return key;
                }
                return undefined;
            });
            matchedKeys = matchedKeys.filter(x => {return x!==undefined});
            if (matchedKeys.length > 0) {
                differenceKeys = keys.filter(x => !matchedKeys.includes(x));
                for (let key of differenceKeys) {
                    if(key)
                        delete campaignTableStorage[key];
                }
            }
            console.log('keys', keys);
            console.log('matchedKeys', matchedKeys);
            console.log('differenceKeys', differenceKeys);
            console.log('campaign data loaded ', campaignTableStorage);
            console.log('searchValue', searchValue);
        }
        setLocalState({ campaignTableStorage });


    }

    useEffect(() => {
        campaignTableStorage = JSON.parse(localStorage.getItem('campaignTableStorage'));
        if (!campaignTableStorage)
            campaignTableStorage = {};
        if (globalState.CampaignNoLimitFactoryInstance) {
            loadNoLimitData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
        }
    }, []);

    useEffect(() => {
        if (globalState.CampaignNoLimitFactoryInstance) {
            loadNoLimitData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
        }
        console.log('campaign factory localstate', localState.campaignTableStorage);
    }, [globalState]);

    useEffect(() => {
        if (event.type = "newCampaignCreated") {
            if (globalState.CampaignNoLimitFactoryInstance) {
                loadNoLimitData(globalState.web3, globalState.CampaignNoLimitFactoryInstance);
            }
            console.log('campaign factory localstate', localState.campaignTableStorage);
        }
    }, [event]);

    useEffect(() => { 
        console.log('search value updated');
        if(globalState.CampaignNoLimitFactoryInstance)
            loadNoLimitData(globalState.web3, globalState.CampaignNoLimitFactoryInstance); 
    }, [searchValue]);

    const handleSearchValue = (e) => {
        const { name, value } = e.target;
        setSearchValue(value);
    };

    if (globalState?.isConnected) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item md={12} sx={12}>
                        <TextField label="Search campaign by name, symbol, address" id="searchCampaign" name="searchCampaign" value={searchValue} onChange={handleSearchValue} type="text" sx={{ mt: '1rem', width: '100%' }} />
                    </Grid>
                    <Grid item md={8} sx={{ display: { xs: "none", md: 'flex' } }}>
                        <CampaignCardList campaignTableStorage={localState.campaignTableStorage} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CampaignAddNew />
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