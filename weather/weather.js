const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/5689438d2777dd41583ea001328f45eb/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('#### Unable to connect to Forecast.io server ####');
        } else if (response.statusCode === 400) {
            callback('#### Unable to fetch weather ####');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,                 
                apparentTemperature: body.currently.apparentTemperature
            }); 
        }
    });
};

module.exports.getWeather = getWeather;