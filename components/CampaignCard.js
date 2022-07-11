import React from "react";
import { Typography, Box, Grid, Container, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";


export default function CampaignCard(props){

    return(
        <>
            <Card sx={{ width: 400 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name} - {props.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Campaign address: </b> {props.campaignAddress} </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Owner: </b> {props.owner}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Type: </b>{props.type}  </Typography>
                        <Typography variant="body2" color="text.secondary"> <b>Remaning offers:</b> {props.remaningOffers}  </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );

}