const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const app = express()


const port = process.env.PORT || 3000

//Define path for the express
const publicDirectoyPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Set up handle bars and the view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Define the static dictionary to serve 
app.use(express.static(publicDirectoyPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kunal Dhingra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kunal Dhingra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help page',
        title: 'Help',
        name: 'Kunal Dhingra'
    })
})

app.get('/Weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Search query is empty. Please enter the address'
        })
    }
    
    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitude, lattitude, (error, forecast) => {
            console.log(forecast)
            res.send({
               temperature: forecast.temperature,
               location: location, 
               weather: forecast.weathersummary
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return (res.send ({
            error : 'Search query is empty. Please try again'
        }))
    }

    console.log(req.query.search)

    res.send({
        products: []
    }) 
})
app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Kunal Dhingra',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Kunal Dhingra',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port no : " + port)
})