import { Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TokenActions from "./TokenActions";
import Description from "./Description";
import CashOut from "./CashOut"
import Web3 from "web3";

export default function CampaignNoLimitBody({ noLimitCampaignInstance, wallet, campaignAddress, web3 }) {


    const [cashOut, setCashOut] = useState(undefined);
    const [pay, setPay] = useState();
    const [campaignData, setCampaignData] = useState(undefined);

    const loadCampaignData = async (noLimitCampaignInstance) => {
        let name = await noLimitCampaignInstance.methods.name().call();
        let symbol = await noLimitCampaignInstance.methods.symbol().call();
        let owner = await noLimitCampaignInstance.methods.admin().call();
        let productPrice = await noLimitCampaignInstance.methods.productPrice().call();
        productPrice = Web3.utils.fromWei(productPrice, "ether");
        let type = 'NoLimit';
        let remaningOffers = await noLimitCampaignInstance.methods.remaningOffers().call();
        let contractBalance = await web3.eth.getBalance(campaignAddress);
        contractBalance = Web3.utils.fromWei(contractBalance.toString(), "ether");
        let tmpObj = { name, symbol, owner, type, remaningOffers, productPrice, campaignAddress, contractBalance };
        console.log('tmpObj', tmpObj);
        setCampaignData(tmpObj);
        if(owner == wallet){
            setCashOut(<> <Grid item xs={12} md={6}> <CashOut noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet}/> </Grid> </>)
        }
    }

    useEffect(() => {
        console.log('noLimitCampaignInstance', noLimitCampaignInstance);
        loadCampaignData(noLimitCampaignInstance);

    }, [noLimitCampaignInstance]);

    if (campaignData) {
        return (<>
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                <Grid item xs={12} md={6}> 
                    <Description noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet} campaignData={campaignData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TokenActions noLimitCampaignInstance={noLimitCampaignInstance} wallet={wallet} campaignData={campaignData}/>
                </Grid>
                {cashOut}
            </Grid>
        </>);
    }
    else {
        return (<><Typography variant="h5"> Loading ...</Typography></>);
    }
}