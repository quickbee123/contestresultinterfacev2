const pool = require('./pool');

const getContest = (req,res)=>{

    pool.getConnection(function(err, db) {

        if(err){
            res.status(503).json({body: err});
        }

        else{

            var sql = "SELECT * FROM subgovernances";

            db.query(sql,(err,result)=>{

                if(err){
                    res.status(502).json({body: err});
                }
                res.json(result);
            })

            db.release();

        }

        

    });

    

}
module.exports = getContest;