import express from 'express'
import userRouter from './routes/user.routes.js'

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.json());
app.use('/api', userRouter);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
