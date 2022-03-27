const dotenv = require('dotenv');
const express = require('express');
const connectMongoDB = require('./config/database');
const useErrorHandler = require('./middlewares/error');

//Routes;
const userRouter = require('./routes/user');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', userRouter);
app.use(useErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectMongoDB();
});
