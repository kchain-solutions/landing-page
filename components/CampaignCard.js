import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Container, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";


export default function CampaignCard(props) {

    const router = useRouter();
    const [imageLink, setImageLink] = useState(undefined);
    const [cardMedia, setCardMedia] = useState(undefined);

    const loadImage = async (props) => {
        try {
            let res = await axios.get(props.uri);
            let data = res.data;
            if (data.properties?.image?.description) {
                console.log('axios data type ', typeof data);
                console.log('axios data type ', data);
                setCardMedia(<CardMedia
                    component="img"
                    height="194"
                    image={'https://ipfs.io/ipfs/' + data.properties?.image?.description}
                />);
            }
        } catch (error) {
            console.log('axios error ', error);
        }

    }

    useEffect(() => {
        loadImage(props);
    }, [props]);

    return (
        <>
            <Card sx={{ width: 400 }} onClick={event => { router.push('/campaign?campaignAddress=' + props?.campaignAddress + '&campaignType=' + props?.type) }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name} - {props.symbol}
                    </Typography>
                    {cardMedia}
                    <Typography variant="body2" color="text.secondary"> <b>Campaign address: </b> {props.campaignAddress} </Typography>
                    <Typography variant="body2" color="text.secondary"> <b>Owner: </b> {props.owner}  </Typography>
                    <Typography variant="body2" color="text.secondary"> <b>Type: </b>{props.type}  </Typography>
                    <Typography variant="body2" color="text.secondary"> <b>Remaning offers:</b> {props.remaningOffers}  </Typography>
                    <Typography variant="body2" color="text.secondary"> <b>Product price:</b> {props.productPrice} ETH </Typography>
                </CardContent>
                <CardActionArea>
                    <Typography variant="h6"> <b> Open contract </b></Typography>
                </CardActionArea>
            </Card>
        </>
    );

}