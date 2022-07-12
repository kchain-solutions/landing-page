import React, { useState, useEffect, useContext } from "react";
import { Events } from "./Events.js";
import { Grid, TextField, Container, Button, Icon, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CampaignNoLimitBuild from "../build/contracts/CampaignNoLimit.json";
import { width } from "@mui/system";

export default function NewNoLimitCampaign(props) {

    const style = {
        textField: { width: '90%' },
        gridContainer: { mt: '1rem' }
    }

    const { event, setEvent } = useContext(Events);
    const [formValues, setFormValues] = useState({
        name: undefined,
        symbol: undefined,
        uri: undefined,
        productPrice: undefined,
        remaningOffers: undefined,
        campaignRoyaltiesPerc: 0,
        campaignCashbackPerc: 0,
        logMessage: undefined,
        errorMessage: undefined
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value
        });
        console.log(formValues);
    }

    const handleSubmit = () => {
        if (formValues.campaignRoyaltiesPerc + formValues.campaignCashbackPerc) {
            setFormValues({
                ...formValues,
                errorMessage: 'The sum of royalties and cashback should be less then 100'
            });
            return;
        }
    };

    return (<>
        <Container>
            <Grid container spacing={2} sx={style.gridContainer}>
                <Grid item xs={12}>
                    <Button variant="Contained" onClick={handleSubmit} sx={{ width: '90%' }}> <AddIcon/> Create new NoLimit Campaign </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body" color={'success'}>{formValues.errorMessage}</Typography>
                    <Typography variant="body" color={'error'}>{formValues.logMessage}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField required id="name" name="name" value={formValues.name} label="Campaign name" type="text" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="symbol" name="symbol" value={formValues.symbol} label="NFT Symbol" type="text" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="uri" name="uri" value={formValues.uri} label="NFT URI resource" type="text" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="remaningOffers" name="remaningOffers" value={formValues.remaningOffers} label="Offers available" type="number" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="campaignRoyaltiesPerc" name="campaignRoyaltiesPerc" value={formValues.campaignRoyaltiesPerc} label="Royalties %" type="number" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="campaignCashbackPerc" name="campaignCashbackPerc" value={formValues.campaignCashbackPerc} label="Cashback %" type="number" onChange={handleChange} sx={style.textField} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="productPrice" name="productPrice" value={formValues.productPrice} label="Product price (ETH)" type="number" onChange={handleChange} sx={style.textField} />
                </Grid>

                <Grid item xs={12}>

                </Grid>

            </Grid>
        </Container>
    </>);
}