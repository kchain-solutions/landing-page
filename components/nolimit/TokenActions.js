import { Typography, Grid, Container } from "@mui/material";
import React, { useEffect, useState, useContext, useReducer } from "react";
import MintButton from "./MintButton";
import TokenSelector from "./TokenSelector";
import PayWithNft from "./PayWithNft";
import { Events } from "../Events";
import CashOut from "./CashOut";
import Transfer from "./Transfer";

function reducer(state, action) {
    console.log('Dispatcher', state);
    switch (action.type) {
        case 'UPDATE_LIST':
            console.log('Reducer init', state);
            if (action.tokenList)
                if (action.tokenList.length > 0)
                    return { ...state, tokenList: action.tokenList, tokenSelected: action.tokenSelected };
            return { ...state };

        case 'TOKEN_SELECTED':
            console.log('Reducer token selected', action.tokenSelected);
            return { ...state, tokenSelected: action.tokenSelected };

        case 'TOKEN_TRANSFERED':
            console.log('Reducer token transfered');
            return { ...state };

        case 'PAYED':
            console.log('Reducer payed');
            return { ...state };

        case 'MINT':
            console.log('Reducer mint');
            return { ...state };

        default:
            state;

    }
}

export default function ({ noLimitCampaignInstance, wallet, campaignData }) {

    const { event, setEvent } = useContext(Events);
    const [tokenList, setTokenList] = useState([]);
    const [tokenItems, setTokenItems] = useState(undefined);
    const [cashOutItem, setCashOutItem] = useState(undefined);

    const initialState = {
        tokenSelected: -1,
        tokenList: []
    }

    // const loadTokenList = async (noLimitCampaignInstance) => {
    //     let validNFTs = await initialState.noLimitCampaignInstance.methods.getValidNFTs().call({ from: wallet });
    //     console.log('valid NFT', validNFTs);
    //     setTokenList(validNFTs);
    //     initialState.tokenList = validNFTs;
    // }

    const updateTokenList = async () => {
        let validNFTs = await noLimitCampaignInstance.methods.getValidNFTs().call({ from: wallet });
        console.log('initTokenList', validNFTs);
        dispatcher({ type: 'UPDATE_LIST', tokenList: validNFTs, tokenSelected: 0 })
    }

    const [state, dispatcher] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('state object updated', state);
        if (state.tokenList) {
            if (state.tokenList.length > 0) {
                setTokenItems(<>
                    <Grid item xs={12}>
                        <TokenSelector
                            tokenList={state.tokenList}
                            dispatcher={dispatcher}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Transfer
                            noLimitCampaignInstance={noLimitCampaignInstance}
                            wallet={wallet}
                            tokenSelected={state.tokenSelected}
                            updateTokenList={updateTokenList}
                            dispatcher={dispatcher}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <PayWithNft
                            noLimitCampaignInstance={noLimitCampaignInstance}
                            wallet={wallet}
                            tokenSelected={state.tokenSelected}
                            dispatcher={dispatcher}
                            campaignData={campaignData}
                            updateTokenList={updateTokenList}
                        />
                    </Grid>
                </>);
            }
        }
    }, [state]);

    useEffect(() => {
        updateTokenList(noLimitCampaignInstance);
        console.log('campaign owner', campaignData.owner, 'wallet connected', wallet)
        if (campaignData.owner === wallet) {
            setCashOutItem(<>
                <Grid item xs={12}>
                    <CashOut
                        noLimitCampaignInstance={noLimitCampaignInstance}
                        wallet={wallet}
                        campaignData={campaignData}
                        sx={{ color: '#870e05' }}
                    />
                </Grid>
            </>);
        }
    }, [noLimitCampaignInstance]);

    return (<> <Container>
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="h5"> Token operation </Typography>
            </Grid>
            {tokenItems}
            <Grid item xs={12}>
                <MintButton
                    noLimitCampaignInstance={noLimitCampaignInstance}
                    wallet={wallet}
                    updateTokenList={updateTokenList}
                    dispatcher={dispatcher} />
            </Grid>
            {cashOutItem}
        </Grid>
    </Container>
    </>);
}