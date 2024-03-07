const request = require('request')

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