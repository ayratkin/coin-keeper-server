import {PrismaClient} from '@prisma/client'
import {log} from "prisma/prisma-client/generator-build/index.js";

const prisma = new PrismaClient()

class CostController {
  // Получение всех трат: все категории за всё время
  async getAllCosts(req, res) {
    const allCosts = await prisma.cost.findMany({
      include: {
        wallet: true,
      }
    });
    res.json(allCosts)
  }

  // Новая затрата
  async addNewCost(req, res) {
    const {categoryId, id: wallet_id, count, name} = req.body
    await prisma.cost.create({
      data: {
        wallet_id: 1,
        cost_category_id: categoryId,
        count: count,
        name: name
      },
    })

    const OldBalanceObj = await prisma.wallet.findUnique({
      where: {
        wallet_id: wallet_id
      },
      include: {
        wallet_balance: true
      }
    })

    const oldBalanceCount = OldBalanceObj.wallet_balance.balance
    let newBalanceCount = oldBalanceCount - count

    await prisma.wallet_balance.update({
      where: {
        wallet_balance_id: 1,
      },
      data: {
        balance: newBalanceCount,
      },
    })

    res.json({status: 'success'})
  }

  async createCostCategory(req, res) {
    await prisma.cost_category.create({
      data: {
        cost_category_id: 9,
        name: 'Спорт',
        icon: '3'
      },
    })

    res.json({status: 'success'})
  }

  async getCostCategories(req, res) {
    const allCostCategories = await prisma.cost_category.findMany();
    const allCosts = await prisma.cost.findMany()

    // Высчитываем сколько было затрат для каждой категории
    // Возваращаем дополненный суммой затрат объекты
    const allCostCategoriesWithBalance = allCostCategories.map((costCategory) => {
      const categoryCosts = allCosts.filter((cost) => {
        return cost.cost_category_id === costCategory.cost_category_id
      })

      let categoryCostSum = 0;
      categoryCosts.forEach((cost) => {
        categoryCostSum += cost.count
      })

      return {
        ...costCategory,
        count: categoryCostSum
      }
    })

    res.json(allCostCategoriesWithBalance);
  }
}

export default new CostController();
