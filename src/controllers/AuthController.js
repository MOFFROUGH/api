const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { User } = require('../models')

//give the user a JWT token

function allocateToken(user) {
	const ONE_WEEK = 3600 * 24 * 7;
	return jwt.sign(user, config.authentication.jwtsecret, {
		expiresIn: ONE_WEEK
	})

}

module.exports = {
	async register(req, res) {
		try {
			const user = await User.create(req.body)
			res.send({
				user: user.toJSON(),
				token: allocateToken(user.toJSON())
			})

		} catch (err) {
			res.status(400).send({
				error: `This email already exists`
			})
		}
	},
	async login(req, res) {

		try {

			const { email, password } = req.body
			const user = await User.findOne({
				where: {
					email: email
				}
			})
			if (!user) {
				return res.status(403).send({
					error: 'Email not found'
				})
			}

			const validatePass = await user.comparepass(password)

			if (!validatePass) {
				console.log(validatePass)
				return res.status(403).send({
					error: 'The credentials were invalid'
				})
			}
			res.send({
				user: user.toJSON(),
				token: allocateToken(user.toJSON())
			})

		} catch (err) {

		}
	}
}