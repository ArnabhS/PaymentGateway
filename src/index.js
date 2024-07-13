const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swaggerOptions.js');
const userRoutes = require('./routes/userRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const { protect } = require('./middleware/authMiddleware.js')
const cookieParser = require('cookie-parser');
const { errorHandler, notFound } = require('./middleware/errorMiddeware.js');

dotenv.config({ path: "./.env" });

const app = express();


app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDB();

// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', protect,paymentRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
