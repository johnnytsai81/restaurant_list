// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs =  require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const restaurantList = require('./restaurant.json')

// routes setting
app.engine('handlebars', exphbs({ helpers: multihelpers, defaultLayout: 'main', }))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// routes setting
app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

// search fot name, category
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword.toLowerCase())
  })

  const resultcount = restaurants.length
  res.render('index', { restaurants: restaurants, keyword: keyword, resultcount: resultcount })
})

// render show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})