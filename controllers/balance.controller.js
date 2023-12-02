import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class BalanceController {
  async getBalance(req, res) {
    const balance = await prisma.wallet.findUnique({
      where: {
        wallet_id: 1
      },
      include: {
        wallet_balance: true
      }
    })

    const preparedBalance = {
      balanceName: balance.name,
      balance: balance.wallet_balance.balance,
      currency: balance.wallet_balance.currency
    }
    res.json(preparedBalance)
  }

  async changeBalance(req, res) {
    const {id, count, type} = req.body

    const OldBalanceObj = await prisma.wallet.findUnique({
      where: {
        wallet_id: id
      },
      include: {
        wallet_balance: true
      }
    })

    const oldBalanceCount = OldBalanceObj.wallet_balance.balance
    let newBalanceCount;
    if (type === 'profit') {
      newBalanceCount = oldBalanceCount + count
    } else if (type === 'loss') {
      newBalanceCount = oldBalanceCount - count
    }

    const updatedBalance = await prisma.wallet_balance.update({
      where: {
        wallet_balance_id: 1,
      },
      data: {
        balance: newBalanceCount,
      },
    })

    res.json(updatedBalance)
  }
}

export default new BalanceController();
