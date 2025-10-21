require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { globalErrorHandler } = require('./src/utils/errorHandler');
const DependencyContainer = require('./src/application/container/DependencyContainer');

const app = express();
const PORT = process.env.PORT || 3001;

const container = new DependencyContainer();
container.configure();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/v1/auth', createAuthRoutes(container));
app.use('/api/v1/users', createUserRoutes(container));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use(globalErrorHandler);

function createAuthRoutes(container) {
  const express = require('express');
  const router = express.Router();
  const authController = container.resolve('authController');
  
  router.post('/register', authController.register.bind(authController));
  router.post('/login', authController.login.bind(authController));
  
  return router;
}

function createUserRoutes(container) {
  const express = require('express');
  const router = express.Router();
  const userController = container.resolve('userController');
  const authMiddleware = container.resolve('authMiddleware');
  
  router.get('/me', authMiddleware.verifyToken, userController.getProfile.bind(userController));
  
  return router;
}

app.listen(PORT, () => {
  console.log(`Auth & User Service running on port ${PORT}`);
});