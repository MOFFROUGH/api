const Joi = require('joi')

module.exports ={
	register(req,res, next){
		console.log('register policy ..... ',req.body)
	 const schema = {
		name: Joi.string(),
	 	email: Joi.string().email(),
	 	password: Joi.string().regex(
	 		new RegExp('^[a-zA-Z0-9]{8,32}$') //atleast 8 characters long
	 		)
	 }
	 const {error, value} = Joi.validate(req.body,schema)

	 if(error){
	 	switch(error.details[0].context.key){
	 		case 'email':
	 			res.status(400).send({
	 				error:'provide a valid email'
	 			})
	 		break
	 		case 'password':
	 			res.status(400).send({
	 				error:'provide a password should be atleast 8 characters long'
	 			})
	 		break
	 		default:

	 		res.status(400).send({
	 				error:'Invalid registration information'
	 			})
	 	}
	 }else{
	 	next()
	 }
	}
   }