const request = require('request')

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2FydmVzaGsiLCJhIjoiY2tleHF3a3YxMDJxaTJ0b29oZDZ1dnh6aiJ9.74mo5YHK9nSW6YFXZe4SWA&limit=1"
       request({url,json:true},(error,{body})=>{
       if(error){
           callback("Cannot connect to the Geo code Services",undefined)
       }else if(body.features.length === 0){ //body.features.length === 0
           callback("Unable to find location.Search for another location",undefined)
       }else{
           callback(undefined,{
            longitude : body.features[0].center[0],
               latitude: body.features[0].center[1],
               location : body.features[0].place_name
           })
       }

       console.log(body.features.length)
       console.log(body.query.length)
   })
   }
   
   
module.exports = geocode