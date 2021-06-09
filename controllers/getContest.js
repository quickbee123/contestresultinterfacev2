const pool = require('./pool');

const getContest = (req,res)=>{

        pool.connect((err, client, release) => {

            var sql = `SELECT * FROM contests WHERE "SubgovernanceId" != -1`;

            client.query(sql,(err,result)=>{

                if(err){
                    console.log(err);
                    res.status(502).json({body: err});
                }
                release();
                res.json(result.rows);
            })
        });

        

}
module.exports = getContest;