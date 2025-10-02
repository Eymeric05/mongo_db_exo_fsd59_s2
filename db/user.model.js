import db from "./index.js"

const userSchema = db.Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

export default db.model("users", userSchema);
