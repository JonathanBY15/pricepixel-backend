// controllers/wishlistController.js

const WishlistItem = require('../models/wishlistItem');

// Get wishlist items for a user
exports.getWishlistItems = async (req, res) => {
    const userId = req.user.uid; // Get user ID from the request (set by the auth middleware)

    try {
        const wishlistItems = await WishlistItem.findAll({
            where: { uid: userId }, // Find wishlist items for this user
            attributes: ['game_id', 'alert_price'], // Select specific attributes
        });

        // Check if wishlist items exist
        if (wishlistItems.length === 0) {
            return res.status(404).json({ message: 'No wishlist items found' });
        }

        // Return wishlist items along with user ID
        res.json(wishlistItems.map(item => ({
            uid: userId,
            game_id: item.game_id,
            alert_price: item.alert_price,
        })));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
