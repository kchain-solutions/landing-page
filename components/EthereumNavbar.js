import { Grid, Box, AppBar, Toolbar, Typography, Container, Divider } from '@mui/material';
import React from 'react';
import ConnectionButton from './ConnectionButton';
import { useEffect, useState, useContext } from 'react';
import CampaignFactoryInstances from '../ethereum/FactoryInstances';
import { GlobalContext } from "../components/GlobalContext";
import Web3 from "web3";
import logo from "../images/logo.png"

export default function EthereumNavbar(props) {

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const loadState = async (stateSession) => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        let web3 = await new Web3(window.ethereum);
        let factoryInstances = await CampaignFactoryInstances(web3, props.noLimitFactoryAddress, props.scarsityFactoryAddress);
        stateSession['web3'] = web3;
        stateSession['CampaignNoLimitFactoryInstance'] = factoryInstances['CampaignNoLimitFactoryInstance'];
        stateSession['CampaignScarsityFactoryInstance'] = factoryInstances['CampaignScarsityFactoryInstance'];
        console.log('Loaded state', stateSession)
        setGlobalState({...globalState, ...stateSession});
    }

    useEffect(() => {
        console.log('Loading Ethereum Navbar');
        let stateSession = JSON.parse(localStorage.getItem("state"));

        if (stateSession?.isConnected) {
            loadState(stateSession);
            console.log('Loading state from session', stateSession);
        }
        // Check if wallet connection from storage
    }, [])


    const clickConnectionButton = async (web3callback) => {
        //web3connection is a callback from ConnectionButton
        let web3 = await web3callback();
        console.log('ConnectionButton clicked');

        if (web3) {
            let account = await web3.eth.getAccounts();
            let factoryInstances = await CampaignFactoryInstances(web3, props.noLimitFactoryAddress, props.scarsityFactoryAddress);
            let newState = {
                isConnected: true,
                wallet: account[0],
                web3: web3,
                CampaignNoLimitFactoryInstance: factoryInstances['CampaignNoLimitFactoryInstance'],
                CampaignScarsityFactoryInstance: factoryInstances['CampaignScarsityFactoryInstance']
            }
            setGlobalState(
                {
                    ...globalState,
                    ...newState
                });
            localStorage.setItem("state", JSON.stringify({
                isConnected: true,
                wallet: account[0]
            }));
        }
        else {
            setGlobalState({
                ...globalState,
                isConnected: false,
                wallet: '',
                web3: undefined,
                CampaignNoLimitFactoryInstance: undefined,
                CampaignScarsityFactoryInstance: undefined
            });
            localStorage.removeItem("state");
        }
    }


    return (

        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 164 }}>

                    <Box
                        component="img"
                        sx={{
                            display: 'flex', flexWrap: 'wrap',
                            alignItems: 'center',
                            height: 128,
                            width: 128,
                            mr: "2rem"
                        }}
                        src={logo.src}
                    />
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Karma
                    </Typography>

                    <Divider orientation="vertical" flexItem sx={{
                        color: "#FFFFFF"
                    }} />


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: "row-reverse" }}>
                        <Typography></Typography>
                    </Box>

                    <Box>
                        <ConnectionButton connection={globalState} onClick={clickConnectionButton} />
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>

    )
}
