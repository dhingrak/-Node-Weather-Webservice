const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?types=country&access_token=pk.eyJ1Ijoia2RoaW5ncmEiLCJhIjoiY2p1OTNhcHdyMWIwYzN5azlwNGx5dTY1dyJ9.XAbAYQbFy8oGJOLeKX2X5g'
    //console.log(url)
    
    request({url: url, json: true}, (error, {body}) => {

        if(error){
            callback ('Unable to connect to the weather service !!!', undefined)
        } else if(body.features.length ===0){
            callback('Unable to find the location. Please try again.', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })

}


module.exports = geocode