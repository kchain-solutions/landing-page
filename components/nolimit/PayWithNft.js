import React, {useEffect, useState, useContext} from "react";
import { Button, Alert } from "@mui/material";
import { UndoRounded } from "@mui/icons-material";
import Web3 from "web3";
import { Events } from "../Events";

export default function PayWithNft({ noLimitCampaignInstance, wallet, campaignData, tokenSelected, updateTokenList, dispatcher}){
    
    const [alertMessage, setAlertMessage] = useState('');
    const [productPrice, setProductPrice] = useState(campaignData.productPrice);
    const {event, setEvent} = useContext(Events);
    
    const handleClick = async (e) => {
        setAlertMessage(<Alert severity="info"> Payment transaction sent to the blockchain. Waiting for the confirmation</Alert>);
        let toSend = productPrice;
        toSend = Web3.utils.toWei(toSend, "ether");
        toSend = toSend.toString()
        console.log('payment button ',toSend, tokenSelected, wallet);
        try {
            await noLimitCampaignInstance.methods.payWithNft(tokenSelected).send({value: toSend, from:wallet});
            setAlertMessage(<Alert severity="success"> Payment transaction succeed</Alert>);
            setEvent({type:'payment'});
            dispatcher({type:'PAYED'});
            await updateTokenList();
        } catch (error) {
            console.log('Payment button error ',error);
            setAlertMessage(<Alert severity="error"> Payment transaction error</Alert>);
        }
    }

    useEffect(() => {
        console.log('Pay with NFT ', tokenSelected, wallet)
    }, [tokenSelected]);
    
    return (<>
        {alertMessage}
       <Button variant="contained" onClick={handleClick}>Pay with NFT {campaignData.productPrice} ETH</Button>
    </>);
}