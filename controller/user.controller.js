import db from '../db.js'

class UserController {
	async createUser(req, res) {
		const { name } = req.body
		const newPerson = await db.query('INSERT INTO testtable (name) values ($1) RETURNING *', [name])
		res.json(newPerson.rows);
	}

	async getUsers(req, res) {
	}

	async getSingleUser(req, res) {
	}

	async updateUser(req, res) {
	}

	async deleteUser(req, res) {
	}
}

export default new UserController();
