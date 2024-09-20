const express = require('express')
const {swaggerUi, spec} = require('./swagger')
require('dotenv').config()
const app = express()
const coffeeRoutes = require('./src/routes/coffees.route')
const orderRoutes = require('./src/routes/orders.route')
app.use(express.json())

const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})

app.use('/Coffees', coffeeRoutes)
app.use('/Orders', orderRoutes)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));


