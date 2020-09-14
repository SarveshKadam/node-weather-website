const request = require('request')

const forecast = (latitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?key=value&access_key=ae6a241f9621a5116affb618e4cc059e&query='+latitude+','+longitude+'&units=f'
request({url,json:true},(error,{body})=>{
    if(error){
        callback("Unable to access weather services",undefined)
    }else if(body.error){
        callback("Unable to find location",undefined)
    }else{
        callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" fh and it feels like "+body.current.feelslike+" fh out there")
}
})
}

module.exports = forecast