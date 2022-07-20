import React, { useEffect, useState } from "react";
import { Button, Alert } from "@mui/material";
import { UndoRounded } from "@mui/icons-material";

export default function CashOut({ noLimitCampaignInstance, wallet, campaignData }) {

    const [alertMessage, setAlertMessage] = useState('');

    const handleClick = async () => {
        setAlertMessage(<Alert severity="info"> Cashout transaction sent to the blockchain. Waiting for the confirmation</Alert>);
        try {
            await noLimitCampaignInstance.methods.payWithNft().send({ from: wallet });
            setAlertMessage(<Alert severity="success"> Cashout transaction succeed</Alert>);
        } catch (error) {
            console.log('Payment button error ', error);
            setAlertMessage(<Alert severity="error"> Cashout transaction error</Alert>);
        }
    }

    if (campaignData) {
        return (<>
            {alertMessage}
            <Button variant="contained" onClick={handleClick}>Withdraw {campaignData.adminBalance} ETH</Button>
        </>);
    }
}