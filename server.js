require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/api/routes/auth.routes');
const userRoutes = require('./src/api/routes/user.routes');
const { globalErrorHandler } = require('./src/utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors()); 
app.use(express.json()); 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Auth & User Service running on port ${PORT}`);
});