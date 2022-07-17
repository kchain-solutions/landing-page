import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Container, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import CampaignCard from "./CampaignCard";

export default function CampaignCardList({ campaignTableStorage }) {

    const [state, setState] = useState({
        cardList: undefined
    });

    useEffect(() => {
        let cardList = undefined;
        if (campaignTableStorage) {
            cardList = Object.keys(campaignTableStorage).map((key, index) => {
                console.log('index', index);
                return (
                    <Grid item xs={12} md={6} key={index}>
                        <CampaignCard
                            name={campaignTableStorage[key].name}
                            symbol={campaignTableStorage[key].symbol}
                            campaignAddress={key}
                            owner={campaignTableStorage[key].owner}
                            type={campaignTableStorage[key].type}
                            remaningOffers={campaignTableStorage[key].remaningOffers}
                            productPrice={campaignTableStorage[key].productPrice}
                        />
                    </Grid>
                );
            });
        }
        setState({ cardList });
    }, [campaignTableStorage])


    if (state.cardList) {
        return (
            <>
                <Container>
                    <Box>
                        <Typography variant="h4" sx={{ mt: '1rem' }}>Campaigns List</Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={2} sx={{ mt: '1rem' }}>
                            {state.cardList}
                        </Grid>
                    </Box>
                </Container>
            </>
        );

    }
    else {
        return (<Typography variant="h4" sx={{ mt: '1rem' }}>Loading campaigns list...</Typography>);
    }
}