import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { spendQuantity } = req.body;

    try {
      // Start a transaction
      await prisma.$transaction(async (prisma) => {
        const stock = await prisma.stocks.findUnique({ where: { id: parseInt(id) } });

        if (!stock) return res.status(404).json({ error: 'Stock not found' });

        if (spendQuantity > stock.quantity) return res.status(400).json({ error: 'Not enough stock' });

        const newQuantity = stock.quantity - spendQuantity;
        const pricePerUnit = stock.total_price / stock.quantity;
        const newPrice = pricePerUnit * newQuantity;

        // Update stock
        await prisma.stocks.update({
          where: { id: parseInt(id) },
          data: { quantity: newQuantity, total_price: newPrice },
        });

        // Insert into SpentStocks
        await prisma.spentStocks.create({
          data: {
            stock_id: stock.id,
            quantity_spent: spendQuantity,
            spent_price: pricePerUnit * spendQuantity,
          },
        });
      });

      res.status(200).json({ message: 'Stock updated and spent recorded' });
    } catch (error) {
      res.status(500).json({ error: 'Error spending stock' });
    }
  } else {
    res.status(405).end();
  }
}