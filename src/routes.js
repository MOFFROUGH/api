const AuthController = require('./controllers/AuthController')
const AuthControllerpolicy = require('./policies/AuthControllerpolicy')

module.exports = (app) =>{
	
	app.post('/register',
		AuthControllerpolicy.register,
		AuthController.register)

	app.post('/login',
		
		AuthController.login)
  
}