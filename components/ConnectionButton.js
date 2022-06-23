import React, { Component, useState } from "react";
import Web3 from "web3";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



function ConnectionButton(props) {

    const style = {
        button: {
            background: '#eae7f5'
        },
        text: {
            color: '#3f0c75'
        },
        stack: {
            border: 1,
            borderColor: '#eae7f5'
        }
    }

    const web3Connection = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return new Web3(window.ethereum);
        } else {
            // Show alert if Ethereum provider is not detected
            alert("Please install Metamask");
        }
    }

    const web3Disconnect = async () => {
        return await null;
    }

    if (!props.connection?.isConnected) {
        return (
            <>

                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="right"
                    alignItems="center">
                    <Button
                        sx={style.button}
                        onClick={() => props.onClick(web3Connection)} variant="contained">
                        <Typography variant="h5" sx={style.text}>Connect</Typography>
                    </Button>
                </Stack>

            </>);
    }
    else {
        return (
            <>

                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="right"
                    alignItems="center"
                    sx={style.stack}>
                    <Typography variant="body"> Wallet addr: {props.connection.wallet} </Typography>
                    <Button
                        sx={style.button}
                        onClick={() => props.onClick(web3Disconnect)} variant="contained">
                        <Typography variant="h5" sx={style.text}>Disconnect</Typography>
                    </Button>
                </Stack>
            </>);
    }

}

export default ConnectionButton;