import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class CostController {
  async getAllCosts(req, res) {

    const allCosts = await prisma.cost.findMany({
      // where: {
      //   wallet_id: 1
      // },
      include: {
        wallet: true,
      }
    });
    res.json(allCosts)
  }
}

export default new CostController();
