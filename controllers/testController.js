const User = require('../models/user');
const Wishlist = require('../models/wishlist');
const WishlistItem = require('../models/wishlistItem');

async function testSetup() {
  try {
    // Create a new user
    const newUser = await User.create({
      username: 'test_user',
      hashed_password: 'hashed_password'
    });

    // The user's wishlist will automatically be created due to the relationship
    const wishlist = await Wishlist.create({ uid: newUser.uid });

    // Add a game to the wishlist
    await WishlistItem.create({
      uid: wishlist.uid,
      game_id: 1,  // Replace with actual game ID
      alert_price: 29.99
    });

    console.log('Data added successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = { testSetup };
