
//require('dotenv').config({path:'../.env.local'});

import KarmaContractFactory from "../build/contracts/KarmaContractFactory.json"


async function CampaignFactoryInstance (web3, campaignFactoryAddress) { 
    let inst = await new web3.eth.Contract(
        KarmaContractFactory.abi,
        campaignFactoryAddress
    );
    return inst;
}


export default CampaignFactoryInstance;