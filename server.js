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
// const wishlistRoutes = require('./routes/wishlistRoutes'); // Routes for wishlist functionality
const { testSetup } = require('./controllers/testController');
const authenticateToken = require('./middleware/auth'); // JWT authentication middleware

const app = express();
const PORT = process.env.PORT || 3001; // Set your preferred port

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests (adjust based on your app's security needs)
app.use(bodyParser.json()); // Parse incoming JSON data

// Define relationships
User.hasOne(Wishlist, { foreignKey: 'uid', onDelete: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'uid' });

Wishlist.hasMany(WishlistItem, { foreignKey: 'uid', onDelete: 'CASCADE' });
WishlistItem.belongsTo(Wishlist, { foreignKey: 'uid' });

// Sync the database
sequelize.sync({ force: true }) // REMOVE { force: true } IN PRODUCTION
  .then(() => {
    console.log('Database synced!');
    testSetup();  // Run the test function to insert some data (for testing)
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Routes
app.use('/api/auth', authRoutes); // Routes for user authentication (login, signup)
app.use('/api/wishlist', authenticateToken, wishlistRoutes);
// app.use('/api/wishlist', authenticateToken, wishlistRoutes); // Wishlist routes (protected)

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the PricePixel backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

