const request = require('supertest');
const app = require('../server'); // Import your Express app
const { sequelize } = require('../config/database'); // Import sequelize for resetting the database

// Helper function to clear the database before each test
const clearDatabase = async () => {
  // Disable foreign key checks to truncate tables
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await sequelize.query('TRUNCATE TABLE WishlistItem');
  await sequelize.query('TRUNCATE TABLE Wishlist');
  await sequelize.query('TRUNCATE TABLE User');
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
};

// Run before each test to ensure a clean database
beforeEach(async () => {
  await clearDatabase(); // Clear the database
});

describe('Auth Controller', () => {
  it('should sign up a new user', async () => {
    // Attempt to sign up a new user
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'test@example.com', password: 'password123' });

    // Check that the response status is 201 and contains a token
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in successfully', async () => {
    // Sign up a user first
    await request(app)
      .post('/api/auth/signup')
      .send({ username: 'test@example.com', password: 'password123' });

    // Attempt to log in with the created user
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test@example.com', password: 'password123' });

    // Check that the response status is 200 and contains a token
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

describe('Wishlist Controller', () => {
  let token; // Variable to store the authentication token

  beforeEach(async () => {
    // Signup and login to get a valid token for wishlist tests
    const signupResponse = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'test@example.com', password: 'password123' });

    token = signupResponse.body.token; // Store the token
  });

  it('should add a wishlist item', async () => {
    // Attempt to add a game to the wishlist
    const response = await request(app)
      .post('/api/wishlist/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ gameID: 1, alert_price: 29.99 });

    // Check that the response status is 201 and contains the correct message
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Game added to wishlist');
  });

  it('should get wishlist items', async () => {
    // Add a game to the wishlist first
    await request(app)
      .post('/api/wishlist/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ gameID: 1, alert_price: 29.99 });

    // Attempt to retrieve the wishlist items
    const response = await request(app)
      .get('/api/wishlist/items')
      .set('Authorization', `Bearer ${token}`);

    // Check that the response status is 200 and the correct number of items are returned
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('game_id', 1);
  });
});
