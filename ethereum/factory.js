
//require('dotenv').config({path:'../.env.local'});
import contractAbi from "./build/GameAbi.json"


async function CampaignFactoryInstance (web3) { 
    let inst = await new web3.eth.Contract(
        contractAbi,
        '0x2eE0b56457e3b47fBc14cec8bD84eF3Fa6599225'
    );
    return inst;
}


export default CampaignFactoryInstance;