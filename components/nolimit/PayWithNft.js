import React, {useEffect, useState} from "react";
import { Button } from "@mui/material";

export default function PayWithNft({campaignData}){
    return (<>
       <Button variant="contained">Pay with NFT {campaignData.productPrice} ETH</Button>
    </>);
}