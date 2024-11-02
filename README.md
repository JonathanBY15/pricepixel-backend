<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.pricepixel.xyz/">
    <img src="static\price-pixel-logo-tp.png" alt="Logo" width="480" height="120">
  </a>

  <p align="center" style="font-size: 24px">
    A web app for finding the best PC game deals.
    <br />
    <a href="https://www.pricepixel.xyz/">View Deployed App</a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#database-schema">Database Schema</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About The Project

PricePixel is a web application that enables users to track the prices of their favorite PC games across multiple online stores. Users can add games to their wishlist, set price alerts, and receive notifications when the prices drop below their specified thresholds. The app utilizes the CheapShark API for real-time price data.

### Landing Page

<img src="/static/landing.gif" height="505" width="900" alt="landing-page"/>

### Usage

Users can search for games to find their prices on different stores. Users can also set a price alert to be notified by email when their favorite games go on sale.

<img src="/static/set-alert1.gif" height="500" width="889" alt="usage"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features:

- **Game Price Tracking:**
  - Search for PC games and view prices from various online stores.
  - Add games to a personalized wishlist.
- **Price Alerts:**
  - Set price thresholds to receive notifications when prices drop.
  - Easily manage alerts and view past alerts.
- **User Authentication:**
  - Secure user registration and login.
  - Each user has a unique wishlist.

### Built With

<div align="left">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" height="40" alt="sequelize logo" />
</div>

The app uses PostgreSQL, NodeJS, and React. The database, backend, and fronted are all deployed on Render.

# Database Schema

The database consists of three main entities: **User**, **Wishlist**, and **WishlistItem**.

## Entities

**User**: Represents a user in the application. Each user has a unique identifier (`uid`), a username, and a hashed password for authentication. Each user has a wishlist which is created on signup.

**Wishlist**: Represents a user's wishlist. Each wishlist is associated with one user through the `uid` field. This table allows for tracking which items belong to which user.

**WishlistItem**: Represents an individual item(game) in a user's wishlist. Each wishlist item has a unique identifier (`item_id`), a `game_id` representing the specific game, and an `alert_price` which indicates the price threshold for email notifications. Each wishlist item is associated with a specific wishlist.

## Relationships

- Each **User** has one **Wishlist**.
- A **Wishlist** can contain multiple **WishlistItems**.
- Each **WishlistItem** is linked to one **Wishlist**, and can include a specific game by referencing the `game_id`.

<img src="/static/db-schema.png"  width="900" alt="landing-page"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

# Getting Started

Follow these steps to set up and run PricePixel on your local machine.

## Prerequisites

- <a href="https://nodejs.org/en/download/">Node.js</a>
- <a href="https://www.postgresql.org/download/">PostgreSQL</a>

## Setup - Backend

1. Set up the PostgreSQL database.
   ```sh
   psql -U <your_PostgreSQL_username>
   createdb price_pixel
   ```
2. Clone the repository.
   ```sh
   git clone https://github.com/JonathanBY15/pricepixel-backend
   ```
3. Install dependencies.
   ```sh
   npm install
   ```
4. Create a .env file in the backend directory with the following content:

   ```sh
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   ```

5. Run the backend server.
   ```sh
   npm start
   ```

## Setup - Frontend

1. Clone the repository.
   ```sh
   git clone https://github.com/JonathanBY15/pricepixel-frontend
   ```
2. Install dependencies.
   ```sh
   npm install
   ```
3. Run the frontend.
   ```sh
   npm start
   ```

### Access The Application

Once the PostgreSQL database and the Flask server is created, open your web browser and go to:

```arduino
http://localhost:3000
```

You should now see the PricePixel application running.
