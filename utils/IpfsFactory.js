import * as IPFS from 'ipfs-core'

async function createIpfsInstance(){
    let ipfs = await IPFS.create();
    return new IpfsInstance(ipfs);
}

class IpfsInstance{

    ipfs = undefined; 

    constructor(ipfs){
        this.ipfs = ipfs; 
    }

    async download(cid){
        let ris='';
        for await (const buf of this.ipfs.cat(cid)) {
            ris = buf;
          }
        return ris;
    }

    async upload(data){ 
        const {path} = await this.ipfs.add(data);
        return path;
    }

}

export default createIpfsInstance;