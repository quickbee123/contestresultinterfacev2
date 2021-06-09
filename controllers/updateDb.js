
const {ContestContract} = require("./ContestContract");
const {TonClient,signerNone} = require("@tonclient/core");
const {libNode} = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const pool = require('./pool');

TonClient.useBinaryLibrary(libNode);

const updateDb = async function() {
   

    var unix_now = Math.round(Date.now()/1000);
    var result1 =[];
    var unix = unix_now;

    try{
        const client = new TonClient({
            network: { 
                endpoints: ['main.ton.dev'] 
            } 
        });
        while(1){
            var result0 = (await client.net.query_collection({
                collection: "accounts",
                filter: {
                    code_hash: {
                        eq: "5daea8b855140d110ab07d430883bfecdd4cba9bcded8968fae7fa6cdb5adfbd",
                    },
                    last_paid: {
                        lt: unix
                    }
                },
                order: [{ path: "last_paid", direction: "DESC" }],
                result: "id last_paid"
            })).result;
            result1 = result1.concat(result0);
            if(result0.length<50){
                break;
            }
            else{
                unix = result0[49].last_paid;
            }
        }

        
        
      
        var i = 0
    
    
        var getDetails = setInterval(async function(){

        
            var index= i;         
            i++;
            if(index === result1.length) {
                clearInterval(getDetails);
                callback();
            }
            else{
            var address = result1[index].id;
            
            var acc = new Account(ContestContract, {
                address: address,
                client,
                signer: signerNone(), 
            });

            

            try{

                var result2 = (await acc.runLocal("getContestInfo",{})).decoded.output;
                result1[index].contestInfo=result2;
                var result3 = (await acc.runLocal("getContestProgress",{})).decoded.output;
                var result4 = (await acc.runLocal("contestStartCountdown",{})).decoded.output;  
                result1[index].contestProgress={
                    contestStart: parseInt(result4.secondsLeft)+parseInt(unix_now),
                    contestDeadline: result3.contestDeadline,
                    votingDeadline: result3.votingDeadline
                };
                result1[index].error = false;

            }catch(err){
                result1[index].error = true;
                console.log(err);
            }

            

            }
        
    
            
        }, 3000);
    
        function callback(){

      

                pool.connect((err, client, release) => {

                    if(err){
                        console.log(err);
                    }
                     
                    else{

                        for (let i = 0; i < result1.length; i++){

                            if(!result1[i].error){
                                
                                let sql = `INSERT INTO contests ("Address","Title","ContestStart","ContestDeadline","VotingDeadline") VALUES ('${result1[i].id}','${result1[i].contestInfo.title}','${result1[i].contestProgress.contestStart}','${result1[i].contestProgress.contestDeadline}','${result1[i].contestProgress.votingDeadline}') ON CONFLICT("Address") DO UPDATE SET "ContestDeadline"='${result1[i].contestProgress.contestDeadline}',"VotingDeadline"='${result1[i].contestProgress.votingDeadline}'`;
                                client.query(sql, function (err, res) {
                                if (err) console.log(err);                        
                                });
                            }
                    
                        }

                    }
                    
                release();
                });
    
        }
        
        
        
        }catch(err){
            console.log(err);
        }
}

function hex2a(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i !== bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}   

module.exports = updateDb;