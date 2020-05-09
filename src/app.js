const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT||3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address);
    if(!req.query.address){
        return  res.send({
             error:"please enter address parameter"
         });
     }
     geocode(req.query.address,(err,{latitude,longitude,location})=>{
            if(err){
                res.send({
                    err
                })
            }else{
                forecast(latitude,longitude,(err,info) =>{
                    if(err){
                        res.send({
                            err
                        })
                    }else{
                        res.send({
                            forecast: info,
                            location,
                            address:req.query.address
                        })
                    }

                });
                
            }
     })
  
})

app.get('/products',(req,res) =>{
    console.log(req.query);
    if(!req.query.search){
       return  res.send({
            error:"please enter search parameter"
        });
    }
    res.send({
        products:[]
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })

})

app.listen(port, () => {
    console.log('Server is up on port'+port)
})