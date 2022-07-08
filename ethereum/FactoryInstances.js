import CampaignNoLimitFactoryBuild from "../build/contracts/CampaignNoLimitFactory.json"
import CampaignScarsityFactoryBuild from "../build/contracts/CampaignScarsityFactory.json"

async function FactoryInstances (web3, noLimitFactoryAddress, scarsityFactoryAddress) { 
    const factoryInstances = {};

    if(noLimitFactoryAddress){
        factoryInstances['CampaignNoLimitFactoryInstance'] = await new web3.eth.Contract(
            CampaignNoLimitFactoryBuild.abi,
            noLimitFactoryAddress
        );
    }
    // if(scarsityFactoryAddress){
    //     factoryInstances['CampaignScarsityFactoryInstance'] = await new web3.eth.Contract(
    //         CampaignScarsityFactoryBuild.abi,
    //         scarsityFactoryAddress
    //     );
    // }
    return factoryInstances;
}

export default FactoryInstances;