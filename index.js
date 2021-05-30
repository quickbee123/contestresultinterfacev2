const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const cors = require("cors");
const  getContest = require('./controllers/getContest');
const  getSubgov = require('./controllers/getSubgov');
const  exportToExcel = require('./controllers/exportToExcel');
const updateDb = require('./controllers/updateDb');
const cron = require("node-cron");




var corsOptions = {
    origin: "http://localhost:5000"
  };

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));
  

}

cron.schedule("*/5 * * * *",updateDb);


app.get('/api/contests',getContest);
app.get('/api/subgov',getSubgov);
app.post('/export',exportToExcel);



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
});
