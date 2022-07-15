import React from "react";
import { Typography, Box, Grid, Container, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { useRouter } from "next/router";


export default function CampaignCard(props){

    const router = useRouter();

    return(
        <>
            <Card sx={{ width: 400 }} onClick={event => {router.push('/campaign?campaignAddress='+props?.campaignAddress+'&campaignType='+props?.type)}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name} - {props.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Campaign address: </b> {props.campaignAddress} </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Owner: </b> {props.owner}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Type: </b>{props.type}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Remaning offers:</b> {props.remaningOffers}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Product price:</b> {props.productPrice} ETH </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );

}