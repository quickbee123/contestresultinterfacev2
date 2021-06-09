const pool = require('./pool');

const getContest = (req,res)=>{

            var sql = "SELECT * FROM subgovernances";

            pool.connect((err, client, release) => {

                client.query(sql,(err,result)=>{

                    if(err){
                        res.status(502).json({body: err});
                    }
                    release();
                    res.json(result.rows);
                });

            });
    

}
module.exports = getContest;