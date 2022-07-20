import React, { useEffect, useState, useContext } from "react";
import { Button, Alert } from "@mui/material";
import { Events } from "../Events.js";


export default function MintButton({ noLimitCampaignInstance, wallet }) {

    const [nftStatus, setNftStatus] = useState({ alertMessage: '' });
    const { event, setEvent } = useContext(Events);

    const handleSubmit = async (e) => {
        try {
            setNftStatus({ alertMessage: <Alert severity="info"> {'Minting ...'} </Alert> });
            await noLimitCampaignInstance.methods.mintNFT().send({ from: wallet });
            setNftStatus({ alertMessage: <Alert severity="success"> {'Minting succeed'} </Alert> });
            setEvent({
                type: 'nftMinted'
            });
        } catch (error) {
            setNftStatus({ alertMessage: <Alert severity="error"> Minting error </Alert> });
        }
    }


    return (
        <>
            {nftStatus?.alertMessage}
            <Button variant="contained" onClick={handleSubmit}>Mint NFT</Button>
        </>
    );
}