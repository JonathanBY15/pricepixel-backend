# Project Proposal: PC Game Price Tracker

The idea for this project is to create a website where PC gamers can easily track the prices of their favorite games across different online stores. By using the CheapShark API, the app will let users see game prices in real time, set target prices, and get notifications when a game goes on sale for a price they want.

## Tech Stack

For this project, I'll be using React for the front-end to create a clean and easy-to-use interface. On the back-end, I’ll be using Node.js with Express to handle server-side operations, like processing requests and managing user accounts. PostgreSQL will be the database used to store user data, including their selected games and target prices. The app will rely on the CheapShark API to get real-time price data from stores like Steam, GOG, and Humble Bundle.

## Focus

This project is going to be a full-stack app, so I’ll be focusing equally on both the front-end and back-end. I want to create a smooth experience for users on the front-end, where they can easily track games, set their target prices, and get notified when a game goes on sale. On the back-end, I'll be making sure everything runs smoothly, securely handles user data, and communicates with the CheapShark API to provide accurate pricing.

## Platform

The project will be a website, mainly targeting desktop users since it's geared toward PC gamers. It’ll be optimized for bigger screens, but I’ll make sure it’s responsive enough to work on tablets as well.

## Goal

The main goal of this app is to help gamers track and find the best deals on PC games. By letting users set their own target prices and notifying them when a game is on sale, the app will make it easier for them to save money and not miss out on any discounts. It’s all about giving them a simple way to manage their gaming wishlist and stay updated on game prices.

## Target Audience

The app is designed for PC gamers, especially those who like finding good deals and are on the lookout for sales. These are usually people between 18 and 35 years old who are familiar with digital game stores like Steam and Epic Games. They know their way around gaming websites and are always looking to get the best bang for their buck.

## Data and API

The app will use the CheapShark API to pull in data about game prices, discounts, and the stores where games are sold. This will be the main source for all game-related information. On top of that, I’ll be storing user-specific data (like favorite games and target prices) in a PostgreSQL database. I’ll also create custom API routes to handle user registration, login, game tracking, and notifications.
