import React, {useEffect, useState} from "react";
import { Typography, Box, Grid, Container, Card, CardMedia, CardContent } from "@mui/material";
import Web3 from "web3";


export default function Description({ noLimitCampaignInstance, wallet, campaignAddress }){

    const [descriptionValue, setDescriptionValue] = useState({
        name:'',
        symbol:'',
        campaignAddress:'',
        owner:'',
        type:'',
        remaningOffers:'',
        productPrice:''
    });

    const loadData = async(noLimitCampaignInstance) =>{
        let name = await noLimitCampaignInstance.methods.name().call();
        let symbol = await noLimitCampaignInstance.methods.symbol().call();
        let owner = await noLimitCampaignInstance.methods.admin().call();
        let productPrice = await noLimitCampaignInstance.methods.productPrice().call();
        productPrice = Web3.utils.fromWei(productPrice, "ether");
        let type = 'NoLimit';
        let remaningOffers = await noLimitCampaignInstance.methods.remaningOffers().call();
        let tmpObj = { name, symbol, owner, type, remaningOffers, productPrice, campaignAddress };
        console.log('tmpObj', tmpObj);
        setDescriptionValue(tmpObj);
    }

    useEffect(()=> {
        loadData(noLimitCampaignInstance);
    }, [noLimitCampaignInstance]);

    return(
        <>
            <Card sx={{ width: 400 }}>
                    <CardContent>
                        <Typography variant="h5">
                            {descriptionValue.name} - {descriptionValue.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Campaign address: </b> {descriptionValue.campaignAddress} </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Owner: </b> {descriptionValue.owner}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Type: </b>{descriptionValue.type}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Remaning offers:</b> {descriptionValue.remaningOffers}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Product price:</b> {descriptionValue.productPrice} ETH </Typography>
                    </CardContent>
            </Card>
        </>
    );

}