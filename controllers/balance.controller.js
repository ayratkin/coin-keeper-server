import db from '../db.js'

class BalanceController {
	async getBalance(req, res) {
		const user = await db.query('\n' +
			'SELECT wallet_id, name, balance, currency\n' +
			'FROM wallet_balance\n' +
			'JOIN wallet ON wallet.balance_id=wallet_balance.wallet_balance_id')
		res.json(user.rows);
	}
}

export default new BalanceController();
