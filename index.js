const express = require('express')
const app = express()
const coffeeRoutes = require('./src/routes/coffee.route')
const orderRoutes = require('./src/routes/order.route')
app.use(express.json())


app.listen(8080, () => {
    console.log('Server running on port 8080')
})

app.use('/Coffee', coffeeRoutes)
app.use('/Order', orderRoutes)


