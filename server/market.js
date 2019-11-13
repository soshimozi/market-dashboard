const axios = require('axios');
const moment = require('moment');

const apiKey = 'IWZAJBJAZBXSWAPV';

const timeSeriesFunction = {
    weekly: 'TIME_SERIES_WEEKLY',
    monthly: 'TIME_SERIES_MONTHLY',
    daily: 'TIME_SERIES_DAILY'
};

async function getMarketForSymbol(symbol, func) {
    var url = `https://www.alphavantage.co/query?function=${timeSeriesFunction[func]}&symbol=${symbol}&apikey=${apiKey}`;

    let  response = await axios.get(url);
    return response.data;
}


module.exports = {
    getMarketForSymbol,
};
    
