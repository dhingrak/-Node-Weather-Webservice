
//console.log("Inside the forecast js")
const request = require('request')
const forecast = (longitude, lattitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/0d0f6fd158b98114c4a382ceeab49a1b/' + longitude + ',' + lattitude + '?units=si'
    request({ url : url, json: true}, (error, {body}) =>{

        if(error){
            callback('Unable to connect to Weather service!!!')
        }else if(body.error){ 
            callback("Unable to find the Weather forecast. Please try again.")
        }else{
           callback(undefined, {
               timeZone : body.timezone,
               weathersummary: body.daily.data[0].summary,
               temperature: body.currently.temperature
           })
        }
    })
}

module.exports = forecast