import React, {useEffect, useState} from "react";
import { Typography, Box, Grid, Container, Card, CardMedia, CardContent } from "@mui/material";
import Web3 from "web3";



export default function Description({ noLimitCampaignInstance, wallet, campaignAddress, campaignData }){

    useEffect(() => {

    }, [campaignData]);

    return(
        <>
            <Card sx={{ width: 400 }}>
                    <CardContent>
                        <Typography variant="h5">
                            {campaignData.name} - {campaignData.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Campaign address: </b> {campaignData.campaignAddress} </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Owner: </b> {campaignData.owner}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Type: </b>{campaignData.type}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Remaning offers:</b> {campaignData.remaningOffers}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Product price:</b> {campaignData.productPrice} ETH </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Admin balance:</b> {campaignData.adminBalance} ETH </Typography>
                    </CardContent>
            </Card>
        </>
    );

}