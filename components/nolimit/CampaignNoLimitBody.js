import { Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MintButton from "./MintButton";
import Description from "./Description";

export default function CampaignNoLimitBody({ noLimitCampaignInstance, wallet, campaignAddress }) {


    const [cashOut, setCashOut] = useState();
    const [pay, setPay] = useState();

    useEffect(() => {
        console.log('noLimitCampaignInstance', noLimitCampaignInstance);
    }, []);

    return (<>
        <Grid container spacing={2} sx={{ mt: '1rem' }}>
            <Grid item xs={12} md={6}> <Description noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet} campaignAddress={campaignAddress}/></Grid>
            <Grid item xs={12} md={6}> <MintButton noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet} /></Grid>
            <Grid item xs={12} md={6}> </Grid>
            <Grid item xs={12} md={6}> </Grid>
            <Grid item xs={12} md={6}> </Grid>
        </Grid>
    </>);
}