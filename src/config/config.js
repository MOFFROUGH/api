module.exports ={
	port:process.env.PORT || 8093,
	authentication:{
		jwtsecret:process.env.SECRET || 'sijuiunajua'
	},
	db: {
		database: process.env.DB_NAME || 'farmerv2',
		user: process.env.DB_USER || 'api',
		password: process.env.DB_PASS || 'mimi',
		options: {
			dialect: process.env.DIALECT ||'mysql',
			host: process.env.HOST || 'localhost',
			port:process.env.PORT || '3306',
			operatorsAliases: false //turning off sequelize deprecated String based operators 
		}
	}
}