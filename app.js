const express = require('express')
const app = express()
const port = 3000

// 插入 handlebars 及 express-handlebars
const exphbs =  require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const restaurantList = require('./restaurant.json')

// 路徑設定
app.engine('handlebars', exphbs({ helpers: multihelpers, defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 搜尋名稱及類別
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword.toLowerCase())
  })

  const resultcount = restaurants.length
  res.render('index', { restaurants , keyword , resultcount })
})

// 餐廳詳細頁
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// 監聽express
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})