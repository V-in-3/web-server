const path = require('node:path')
const http = require('node:http')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const viewsPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(viewsPartials)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App NEW',
        name: 'Volodymyr Me'
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Volodymyr Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Volodymyr Me',
        message: 'Help Message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            message: "You must provide a address term"
        })
    }

    geocode(req.query.address, (error, body = null) => {
        if (error) {
            return res.render({error})
        } 

        console.log(body)
        res.send({
            forecast: body,
            location: req.query.address
        })
    })
})
 


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.rating)
    res.send({
        products:[{}]
    })
})



app.get('/help/*', (req, res) => {
    res.render('error',
        {
            title: 'HELP',
            name: 'Volodymyr Me',
            errorMessage: 'Help article not found!'
        })
})

app.get('*', (req, res) => {
    res.render('error',
        {
            name: 'Volodymyr Me',
            title: '404',
            errorMessage: 'Page Not Found!'
        })
})


app.listen(3000, () => {
    console.log('Sever is up on port 3000.')
})