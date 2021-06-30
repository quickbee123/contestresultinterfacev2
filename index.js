const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const  getContest = require('./controllers/getContest');
const  getSubgov = require('./controllers/getSubgov');
const  exportToExcel = require('./controllers/exportToExcel');
const updateDb = require('./controllers/updateDb');

const cron = require("node-cron");
const path = require('path');



const app = express();
app.use(bodyParser.json());



cron.schedule("*/30 * * * *",updateDb);


app.get('/api/contests',getContest);
app.get('/api/subgov',getSubgov);
app.post('/export',exportToExcel);

app.use(express.static('client/build'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
});
