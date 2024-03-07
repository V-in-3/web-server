// const http = require('node:http')

const request = require('request')
// const address = 'Zhytomyr'

// const getWeather = (address, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=6a55d93ed908eee6eba6374729740ba3&query=Zhytomyr'

// const options = {
    // host: 'api.weatherstack.com',
    // port: 80,
    // path: '/current?access_key=6a55d93ed908eee6eba6374729740ba3&query=' + address,
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
// };

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6a55d93ed908eee6eba6374729740ba3&query=' + address

    request({ url, json: true }, (error, req = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (req.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, req.body.current.weather_descriptions[0] + ': It is currently ' + req.body.current.temperature + ' degress out. There is a ' + req.body.current.precip + '% chance of rain.'
            )

        }
    })
}

module.exports = geocode