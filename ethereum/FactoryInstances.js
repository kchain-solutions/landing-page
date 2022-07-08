
//require('dotenv').config({path:'../.env.local'});

import CampaignNoLimitFactoryBuild from "../build/contracts/CampaignNoLimitFactory.json"
import CampaignScarsityFactoryBuild from "../build/contracts/CampaignScarsityFactory.json"



async function CampaignFactoryInstance (web3, noLimitFactoryAddress, scarsityFactoryAddress) { 
    const factoryInstances = {};
    if(NoLimitFactoryAddress){
        factoryInstances['CampaignNoLimitFactoryInstance'] = await new web3.eth.Contract(
            CampaignNoLimitFactoryBuild.abi,
            noLimitFactoryAddress
        );
    }
    if(ScarsityFactoryAddress){
        factoryInstances['CampaignScarsityFactoryInstance'] = await new web3.eth.Contract(
            CampaignScarsityFactoryBuild.abi,
            scarsityFactoryAddress
        );
    }
    return factoryInstances;
}




export default CampaignFactoryInstance;