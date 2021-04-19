const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('../../weather-app/utils/forecast')


//  Initializing express
const app = express()

// Port of the server
const port = process.env.PORT || 3000

// Initializing morgan

app.use(morgan('tiny'))


// Define path for express config
const publicDirectory = path.join(__dirname, '..', 'public')
const viewsPath =path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')


// Setup static directory to serve
app.use(express.static(publicDirectory))


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Routes of all the pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Sosimi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Daniel Sosimi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Daniel Sosimi',
        message: 'what are you doing to my life'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, weather) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                address,
                location,
                weather
            })
        })

    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please enter something'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.use('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Sosimi',
        errorMessage: 'Article is not found'
    })
})


app.use('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is working on ' + port)
})