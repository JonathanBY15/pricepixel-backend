const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/wishlistItem');
const authenticateToken = require('../middleware/auth'); // To ensure the user is authenticated
const { getWishlistItems } = require('../controllers/wishlistController'); // Import the controller

// Route to add an item to the user's wishlist
router.post('/add', authenticateToken, async (req, res) => {
  const { uid, gameID, alert_price } = req.body;

  try {
    // Add the wishlist item to the database
    const newWishlistItem = await WishlistItem.create({
      uid,
      game_id: gameID,
      alert_price
    });

    res.status(201).json({ message: 'Game added to wishlist', item: newWishlistItem });
  } catch (error) {
    console.error('Error adding game to wishlist:', error);
    res.status(500).json({ error: 'Failed to add game to wishlist' });
  }
});

// Route to remove an item from the user's wishlist
router.delete('/remove', authenticateToken, async (req, res) => {
  const { gameID } = req.body; // Get gameID from the request body

  try {
    const deletedItem = await WishlistItem.destroy({
      where: {
        uid: req.user.uid, // Use the authenticated user's UID
        game_id: gameID // Match the gameID to be removed
      }
    });

    if (deletedItem) {
      res.status(200).json({ message: 'Game removed from wishlist' });
    } else {
      res.status(404).json({ error: 'Game not found in wishlist' });
    }
  } catch (error) {
    console.error('Error removing game from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove game from wishlist' });
  }
});

// New route to get wishlist items for the authenticated user
router.get('/items', authenticateToken, getWishlistItems); // Add this line

module.exports = router;
