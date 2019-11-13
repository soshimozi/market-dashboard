const app = require('express')();
const http = require('http').Server(app);
const market = require('./market');

const port = 3000;



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



app.get('/api/market/:symbol/monthly', (req, res) => {

    market.getMarketForSymbol(req.params.symbol, 'monthly')
    .then(response => {
        res.send(response);
    })
     .catch(error => {
         res.send('Error getting market data for ' + req.params.symbol + ': ' + error);
     });
});

app.get('/api/market/:symbol/weekly', (req, res) => {

    market.getMarketForSymbol(req.params.symbol, 'weekly')
    .then(response => {
        res.send(response);
    })
     .catch(error => {
         res.send('Error getting market data for ' + req.params.symbol + ': ' + error);
     });

});

app.get('/api/market/:symbol/daily', (req, res) => {

    market.getMarketForSymbol(req.params.symbol, 'daily')
    .then(response => {
        res.send(response);
    })
     .catch(error => {
         res.send('Error getting market data for ' + req.params.symbol + ': ' + error);
     });
});

http.listen(port, () => {
    console.log(`Listening on *:${port}`);
});
