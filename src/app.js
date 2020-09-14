const path =require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//-----------------Define paths for express config
const publicDirectoryPath = path.join(__dirname,'/../public')
const viewsPath  = path.join(__dirname,'/../template/views')
const partialsPath = path.join(__dirname,'/../template/partials')

//-----------------Set up handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//---------------------Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather APP',
        name:'Sarvesh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sarvesh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        desc : 'Please contact us incase of any issues we are happy to help',
        title:'Help',
        name:'Sarvesh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            console.log(error)
            return res.send(error)
            
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
          })
    
    })
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        error_msg : "Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        error_msg :"Page not found"
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})