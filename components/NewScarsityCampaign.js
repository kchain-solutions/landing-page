import { Typography, Grid } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";

export default function NewScarsityCampaign(props) {

    const style = {
        textField: { width: '90%' },
        gridContainer: { mt: '1rem' },
        alert: { width: '90%' }
    }

    return (<>
        <Grid container spacing={2} sx={style.gridContainer}>
            <Grid item xs={12}>
                <Typography variant="h5">New scarsity campaign</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body"> WIP </Typography>
            </Grid>

        </Grid>
    </>);
}