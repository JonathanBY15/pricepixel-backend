// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const Wishlist = require('./models/wishlist');
const WishlistItem = require('./models/wishlistItem');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlistRoutes');
const { testSetup } = require('./controllers/testController');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV === 'development'; // Check environment

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define relationships
User.hasOne(Wishlist, { foreignKey: 'uid', onDelete: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'uid' });

Wishlist.hasMany(WishlistItem, { foreignKey: 'uid', onDelete: 'CASCADE' });
WishlistItem.belongsTo(Wishlist, { foreignKey: 'uid' });

// Sync the database
sequelize.sync({ force: isDevelopment }) // Only force sync in development
  .then(() => {
    console.log('Database synced!');
    if (isDevelopment) testSetup(); // Run test data setup only in development
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', authenticateToken, wishlistRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the PricePixel backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
