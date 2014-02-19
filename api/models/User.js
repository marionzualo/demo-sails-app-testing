module.exports = {
	schema: true,

	attributes: {
		name: {
			type: 'string',
			required: true
		},

		email: {
			type: 'string',
			required: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		},

		toJSON: function() {
		var obj = this.toObject();

		delete obj.password;
		delete obj.encryptedPassword;
		delete obj._csrf;
		return obj;
		}
	},

	beforeCreate: function(values, next){
		require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if(err) return next(err);
			values.password = encryptedPassword;
			next();
		});
	}
};