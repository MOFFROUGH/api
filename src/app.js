const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//create a sequelize object

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())


//Routes
require('./routes')(app)

sequelize.sync({force:false})
	.then(()=>{

		app.listen(config.port)
		console.log(`Server running in ${config.port}`)
	})
