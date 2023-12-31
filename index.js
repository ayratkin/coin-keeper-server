import express from 'express'
import balanceRouter from './routes/balance.routes.js'
import costRouter from './routes/cost.routes.js'

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use('/api', balanceRouter);
app.use('/api', costRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


