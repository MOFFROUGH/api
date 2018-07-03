const promise = require('bluebird')
const bcrypt = promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options){
	const SALT_FACTOR = 12

	if(!user.changed('password')){
		return
	}
	return bcrypt.genSaltAsync(SALT_FACTOR)
	  .then(salt=>bcrypt.hashAsync(user.password,salt, null))
	  .then(hash=>{
	  	user.setDataValue('password', hash)
	  })
}

module.exports = (sequelize, DataTypes) =>{

	const User = sequelize.define('User',{
		name:{
			type: DataTypes.STRING(100),
			unique: true
		},
		email:{
			type: DataTypes.STRING(100),
			unique: true
		},
		password: DataTypes.STRING(100)
	},
	{
		hooks:{
			beforeCreate: hashPassword
		}
	})

	User.prototype.comparepass = function (password){
		return bcrypt.compareAsync(password, this.password)
	}
	return User;
} 