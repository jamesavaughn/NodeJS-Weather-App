const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv; 

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//axios.get method returns a promise from an http request
axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lat;
    var weatherURL = `https://api.darksky.net/forecast/5689438d2777dd41583ea001328f45eb/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var summary = response.data.currently.summary;
    var precipProbability = response.data.currently.precipProbability;
    var dewPoint = response.data.currently.dewPoint;
    var humidity = response.data.currently.humidity;
    var visibility = response.data.currently.visibility;
    
    console.log(`It's current ${temperature}. It feels like ${apparentTemperature}`);
    console.log(`There is a ${precipProbability} of precipitation with a dewpoint of ${dewPoint}.`);
    console.log(`Humidity levels are ${humidity} with a visibility of ${visibility}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});