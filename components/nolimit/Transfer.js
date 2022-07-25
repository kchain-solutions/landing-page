import React, {useEffect, useState} from "react";
import { Button, Alert, TextField } from "@mui/material";

export default function Transfer({noLimitCampaignInstance, wallet, tokenSelected, updateTokenList, dispatcher}){

    const [receiver, setReceiver] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setReceiver(value);
    }
    const handleClick = async () => {
        setAlertMessage(<Alert severity="info"> Transfer transaction sent to the blockchain. Waiting for the confirmation...</Alert>);
        try {
            await noLimitCampaignInstance.methods.transfer(receiver, tokenSelected).send({from:wallet});
            setAlertMessage(<Alert severity="success"> Transfer transaction succeed</Alert>);
            updateTokenList();
            dispatcher({type:'TOKEN_TRANSFERED'});
        } catch (error) {
            console.log('Payment button error ',error);
            setAlertMessage(<Alert severity="error"> Transfer transaction error</Alert>);
        }
    }


    return (<>
        {alertMessage}
        <TextField label="Address receiver" name="receiver" value={receiver} onChange={handleChange}/>
        <Button variant="contained" onClick={handleClick}> Transfer token </Button>
    </>);
}