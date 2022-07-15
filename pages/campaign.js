import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import CustomTheme from "../components/CustomTheme";
import { GlobalContext } from "../components/GlobalContext";
import EthereumNavbar from "../components/EthereumNavbar";
import CampaignNoLimitBody from "../components/nolimit/CampaignNoLimitBody";
 import CampaignScarsityBody from "../components/scarsity/CampaignScarsityBody";
import CampaignNoLimitBuild from "../build/contracts/CampaignNoLimit.json"
import CampaignScarsityBuild from "../build/contracts/CampaignScarsity.json"
import Web3 from "web3";

export default function campaign(props) {

    const {globalState, setGlobalState} = useContext(GlobalContext)
    const [noLimitCampaignInstance, setNoLimitCampaignInstance] = useState(undefined);
    const [scarsityCampaignInstance, setScarsityCampaignInstance] = useState(undefined);
    const [wallet, setWallet] = useState('');

    const router = useRouter();
    const { campaignAddress, campaignType } = router.query;

    const setContractInstance = async (web3) => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        if(campaignType?.toLowerCase() === 'nolimit'){
            let noLCInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, campaignAddress);
            setNoLimitCampaignInstance(noLCInstance);
        }
        if(campaignType?.toLowerCase()==='scarsity'){
            let noScInstance = await new web3.eth.Contract(CampaignScarsityBuild.abi, campaignAddress);
            setScarsityCampaignInstance(noScInstance);
        }
    }

    useEffect(() => {
        console.log(globalState.wallet);
        console.log(globalState.web3);
        setContractInstance(globalState.web3);
        console.log('noLimitCampaignInstance', noLimitCampaignInstance);
    }, []);

    if (noLimitCampaignInstance) {
        return (<>
            <CustomTheme>
                <EthereumNavbar noLimitFactoryAddress={props.noLimitFactoryAddress} scarsityFactoryAddress={props.scarsityFactoryAddress} />
                <CampaignNoLimitBody noLimitCampaignInstance={noLimitCampaignInstance} wallet={globalState.wallet} />
                <Typography> {campaignAddress} {campaignType} </Typography>
            </CustomTheme>
        </>);
    }
    if (scarsityCampaignInstance) {
        return (<>
            <CustomTheme>
                {/*<EthereumNavbar noLimitFactoryAddress={props.noLimitFactoryAddress} scarsityFactoryAddress={props.scarsityFactoryAddress} />
                 <CampaignScarsityBody scarsityCampaignInstance={scarsityCampaignInstance} wallet={wallet} /> */}
            </CustomTheme>
        </>);
    }

}

export async function getStaticProps() {
    const baseUrl = process.env.API_BASE_URL;
    const noLimitFactoryAddress = process.env.CAMPAIGN_NOLIMIT_FACTORY_RINKEBY;
    const scarsityFactoryAddress = process.env.CAMPAIGN_SCARSITY_FACTORY_RINKEBY;
    return {
        props: {
            baseUrl,
            noLimitFactoryAddress,
            scarsityFactoryAddress
        }
    }
}