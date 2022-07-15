import { Typography, Grid } from "@mui/material";
import React, {useEffect, useState} from "react";
import MintButton from "./MintButton";

export default function CampaignNoLimitBody({noLimitCampaignInstance, wallet}){


    const [cashOut, setCashOut] = useState();
    const [pay, setPay] = useState();

    useEffect(() => {
        console.log('noLimitCampaignInstance', noLimitCampaignInstance);
    }, [noLimitCampaignInstance]);

    return(<>
        <Grid container spacing={2} sx={{mt:'1rem'}}>
            <Grid elem xs={12} md={6}> <MintButton noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet}/></Grid>
            <Grid elem xs={12} md={6}> </Grid>
        </Grid>
        <Typography>Campaign no limit body</Typography>
        </>);
}