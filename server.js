const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const dbConnection = require('./db')
app.use(express.json())

app.use('/api/cars/', require('./routes/carsRoute'))
app.use('/api/users/', require('./routes/usersRoute'))
app.use('/api/bookings/', require('./routes/bookingsRoute'))

app.use(cors(
    {
        origin: ["https://car-management-application1.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
const path = require('path')

if (process.env.NODE_ENV === 'production') {

    app.use('/', express.static('cars24x7/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'cars24x7/build/index.html'));

    })

}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
