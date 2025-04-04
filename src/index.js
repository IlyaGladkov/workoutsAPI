const express = require('express')
const bodyParser = require('body-parser')
const apicache = require('apicache')

const v1workoutRouter = require('./v1/routes/workoutRoutes')

const app = express()
const PORT = process.env.PORT || 3000
const cache = apicache.middleware

app.use(bodyParser.json())
app.use(cache('2 minutes'))
app.use('/api/v1/workouts', v1workoutRouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
})