const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d584988fa3ab58bca1cb097ef5941329&query=' + decodeURIComponent(latitude) + ',' + decodeURIComponent(longitude) + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Sorry, there is no internet connection', undefined)
        } else if (body.current.error) {
            callback('Cant show the weather forecast', undefined)
        }else {
            callback(undefined,  body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature  + '. It is currently ' + body.current.feelslike + ' degrees out')
        }
    })
}


module.exports = forecast