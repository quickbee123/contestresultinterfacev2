import ContestContract from "./contracts/ContestContract";
const {TonClient,signerNone} = require("@tonclient/core");
const {libWeb} = require("@tonclient/lib-web");
const { Account } = require("@tonclient/appkit");

function LibBridge(){
TonClient.useBinaryLibrary(libWeb);
}
LibBridge();

class tonAPI{

    constructor(){
        this.address=null;
        this.acc=null;
        this.client = new TonClient({
            network: { 
                endpoints: ['main.ton.dev'] 
            } 
        });

    }

    async getAccount(address){
        if(this.address===address)
        return this.acc;

        else{
            this.address=address;
            this.acc = new Account(ContestContract, {
                address: address,
                client: this.client,
                signer: signerNone(), 
            });
            return this.acc;
        }
        

    }

    async runContestMethod(address,funcName,param){

        const acc = await this.getAccount(address);
        return (await acc.runLocal(funcName,param)).decoded.output;

    }

async getSubmJurorInfo(address){

    var submission=[],juror=[],jurorinfo=[],entries=[];

    

    const result1 = await this.runContestMethod(address,"listContenders",{});
  

    entries = result1.ids.map((id,index)=>{
      return {
          id: id,
          address:result1.addresses[index]
      }
    })

    function updateCount(array,label){
    array.forEach(function(address){

        if (juror[address]) {
            juror[address][label] = (juror[address][label] || 0) + 1;
        } else {
            juror[address] = {
                [label]: 1,
            }
        }
    })
    }
   
    submission = await Promise.all(entries.map(async(subm)=>{
        
       

        var result3 =  await this.runContestMethod(address,"getVotesPerJuror",{"id":subm.id});
        
        var marks = await result3.marks.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        
        const subinfo = {
            marks:marks,
            accepted:result3.jurorsFor.length,
            rejected:result3.jurorsAgainst.length,
            abstained:result3.jurorsAbstained.length
        };



        updateCount(result3.jurorsFor,'accepted');
        updateCount(result3.jurorsAbstained,'abstained');
        updateCount(result3.jurorsAgainst,'rejected');

        return {...subm,...subinfo}
    
    }));
    for (var addr in juror){
        
        juror[addr].address=addr;
        jurorinfo.push(juror[addr]);
      }
    const result = {submissions: submission, jurors: jurorinfo};
    return result;
}

async getContestTitle(address){
    try{
    const result = await this.runContestMethod(address,"getContestInfo",{});
    return result.title;
    }
    catch(err){
        console.log(err);
    }
}

}

export default new tonAPI();