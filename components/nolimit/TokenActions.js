import { Typography, Grid, Container } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import MintButton from "./MintButton";
import TokenSelector from "./TokenSelector";
import PayWithNft from "./PayWithNft";
import { Events } from "../Events";
import CashOut from "./CashOut";
import Transfer from "./Transfer";

export default function ({ noLimitCampaignInstance, wallet, campaignData }) {

    const { event, setEvent } = useContext(Events);
    const [tokenSelected, setTokenSelected] = useState('');
    const [tokenList, setTokenList] = useState([]);
    const [tokenItems, setTokenItems] = useState(undefined);
    const [cashOutItem, setCashOutItem] = useState(undefined);
    
    const loadTokenList = async (noLimitCampaignInstance) => {
        let validNFTs = await noLimitCampaignInstance.methods.getValidNFTs().call({ from: wallet });
        console.log('valid NFT', validNFTs);
        setTokenList(validNFTs);
    }


    useEffect(() => {
        console.log('token selected father', tokenSelected);
    }, [tokenSelected])

    useEffect(() => {
        console.log('Event triggered', event.type);
        if(event.type==='nftMinted');
            loadTokenList(noLimitCampaignInstance);
        if(event.type==='tokenIdSelected')
            setTokenSelected(event.value);
        if(event.type==='payment')
            loadTokenList(noLimitCampaignInstance)
    }, [event]);

    useEffect(() => {
        if (tokenList.length > 0) {
            setTokenItems(<>
                <Grid item xs={12}>
                    <TokenSelector
                        tokenList={tokenList} 
                        />
                </Grid>
                <Grid item xs={12}>
                    <Transfer
                        noLimitCampaignInstance={noLimitCampaignInstance}
                        wallet={wallet}
                        tokenSelected={tokenSelected}
                    />
                </Grid>

                <Grid item xs={12}>
                    <PayWithNft
                        noLimitCampaignInstance={noLimitCampaignInstance}
                        wallet={wallet}
                        tokenSelected={tokenSelected}
                        campaignData={campaignData}
                    />
                </Grid>
            </>);
        }
    }, [tokenList]);

    useEffect(() => {
        loadTokenList(noLimitCampaignInstance);
        if (campaignData.owner === wallet) {
            setCashOutItem(<>
                <Grid item xs={12}>
                    <CashOut
                        noLimitCampaignInstance={noLimitCampaignInstance}
                        wallet={wallet}
                        tokenSelected={tokenSelected}
                        campaignData={campaignData}
                    />
                </Grid>
            </>);
        }
    }, [noLimitCampaignInstance]);

    return (<> <Container>
        <Grid container spacing={2}>
            {tokenItems}
            <Grid item xs={12}>
                <MintButton
                    noLimitCampaignInstance={noLimitCampaignInstance}
                    wallet={wallet} />
            </Grid>
        </Grid>
    </Container>
    </>);
}