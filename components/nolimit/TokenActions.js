import { Typography, Grid, Container } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import MintButton from "./MintButton";
import TokenList from "./TokenSelector";
import PayWithNft from "./PayWithNft";
import { Events } from "../Events";

export default function ({ noLimitCampaignInstance, wallet, campaignData }) {

    const { event, setEvent } = useContext(Events);
    const [tokenSelected, setTokenSelected] = useState(0);
    const [tokenList, setTokenList] = useState([]);
    const [gridItems, setGridItems] = useState(undefined);
    const loadTokenList = async (noLimitCampaignInstance) => {
        let validNFTs = await noLimitCampaignInstance.methods.getValidNFTs().call({ from: wallet })
        setTokenList(validNFTs);
        if (validNFTs.length > 0)
            setTokenSelected = validNFTs[0];
    }

    useEffect(() => {
        loadTokenList(noLimitCampaignInstance);
    }, [noLimitCampaignInstance]);

    useEffect(() => {
        loadTokenList(noLimitCampaignInstance);
    }, [event]);

    useEffect(() => {
        if (tokenList.length > 0) {
            setGridItems(<>            
            <Grid item xs={12}>
                <TokenList
                    tokenList={tokenList}
                    tokenSelected={tokenSelected}
                    setTokenSelected={setTokenSelected} />
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

    return (<> <Container>
        <Grid container spacing={2}>
            {gridItems}
            <Grid item xs={12}>
                <MintButton
                    noLimitCampaignInstance={noLimitCampaignInstance}
                    wallet={wallet} />
            </Grid>
        </Grid>
    </Container>
    </>);
}