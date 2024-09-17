const express = require('express')
const app = express()
const routes = require('./src/routes/coffee.route')
app.use(express.json())


app.listen(8080, () => {
    console.log('Server running on port 8080')
})

app.use('/Coffee', routes)


