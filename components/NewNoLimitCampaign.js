import React, { useState, useEffect, useContext } from "react";
import { Events } from "./Events.js";
import { GlobalContext } from "./GlobalContext";
import { Grid, TextField, Container, Button, Icon, Typography, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CampaignNoLimitBuild from "../build/contracts/CampaignNoLimit.json";
import { width } from "@mui/system";
const Web3 = require('Web3');

export default function NewNoLimitCampaign({ wallet, CampaignNoLimitFactoryInstance }) {

    const style = {
        textField: { width: '90%' },
        gridContainer: { mt: '1rem' },
        alert: { width: '90%' }
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
        alertMessage: undefined,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const setAlertMessage = (severity, message) => {
        setFormValues({
            ...formValues,
            alertMessage: undefined
        });

        setFormValues({
            ...formValues,
            alertMessage: <Alert severity={severity} sx={style.alert}>{message}</Alert>
        })
    }

    const handleSubmit = async (e) => {
        setFormValues({
            ...formValues,
            alertMessage: undefined,

        });
        console.log(wallet, CampaignNoLimitFactoryInstance);
        if (!(formValues.name && formValues.symbol && formValues.productPrice && formValues.remaningOffers)) {
            setFormValues({
                ...formValues,
                alertMessage: <Alert severity="error" sx={style.alert}>{'* Check for required field'}</Alert>
            });
            return;
        }
        if ((parseInt(formValues.campaignRoyaltiesPerc) + parseInt(formValues.campaignCashbackPerc)) > 99) {
            setFormValues({
                ...formValues,
                alertMessage: <Alert severity="error" sx={style.alert}>{'* The sum of royalties and cashback should be less then 100'}</Alert>
            });
            return;
        }
        setAlertMessage('info', 'Messagge sent to the blockchain');

        try {
            await CampaignNoLimitFactoryInstance.methods.createCampaign(
                formValues.name,
                formValues.symbol,
                formValues.uri,
                Web3.utils.toWei(formValues.productPrice, 'ether'),
                formValues.remaningOffers,
                formValues.campaignRoyaltiesPerc,
                formValues.campaignCashbackPerc
            ).send({ from: wallet });

        } catch (error) {
            console.log(error)
            setAlertMessage('error', 'Transaction error');
            return;
        }
        setAlertMessage('success', 'Campaign created');
        setEvent({
            type: "newCampaignCreated"
        })
        return;
    };

    return (<>
        <Container>
            <Grid container spacing={2} sx={style.gridContainer}>

                <Grid item xs={12}>
                    <Typography variant="h5"> New No Limit campaign </Typography>
                </Grid>
                <Grid item xs={12}>
                    {formValues.alertMessage}
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
                    <Button variant="Contained" onClick={handleSubmit} sx={{ width: '90%' }}> <AddIcon /> Create new NoLimit Campaign </Button>
                </Grid>

            </Grid>
        </Container>
    </>);
}