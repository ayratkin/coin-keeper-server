import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class CostController {
  // Универсальная функция,
  // Возвращает все категории затрат, которые не помечены, как удаленные
  async getCostCategories(req, res) {
    const allCostCategories = await prisma.cost_category.findMany();
    const allCosts = await prisma.cost.findMany()

    // Высчитываем сколько было затрат для каждой категории
    // Возваращаем дополненный суммой затрат объекты
    const allCostCategoriesWithBalance = allCostCategories.map((costCategory) => {
      const categoryCosts = allCosts.filter(cost => cost.cost_category_id === costCategory.cost_category_id)

      let categoryCostSum = 0;
      categoryCosts.forEach((cost) => {
        categoryCostSum += cost.count
      })

      return {
        ...costCategory,
        count: categoryCostSum
      }
    }).filter(costCategory => !costCategory.isRemoved)
    console.log(allCostCategoriesWithBalance)

    res.json(allCostCategoriesWithBalance);
  }

  // Получение всех трат: все категории за всё время
  // Все costs для сцены с историей
  async getAllCosts(req, res) {
    const allCosts = await prisma.cost.findMany({
      include: {
        wallet: true,
        cost_category: true
      }
    });
    res.json(allCosts)
  }

  // Новая затрата
  addNewCost = async (req, res) => {
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

    this.getCostCategories(req, res)
    // res.json({status: 'success'})
  }

  createCostCategory = async (req, res) => {
    await prisma.cost_category.create({
      data: {
        name: req.body.name,
      },
    })

    await this.getCostCategories(req, res)
    // res.json({status: 'success'})
  }


  deleteCostCategory = async (req, res) => {
    try {
      await prisma.cost_category.update({
        where: {
          cost_category_id: req.body.categoryId
        },
        data: {
          isRemoved: true,
        },
      })
    } catch (e) {
      console.log('Категория не удалилась')
      console.log(e)
    }

    await this.getCostCategories(req, res)
  }
}

export default new CostController();
