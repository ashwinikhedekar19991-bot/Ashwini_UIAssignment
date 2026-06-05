
# Reward Dashboard

A React application that calculates and displays customer reward points based on transaction history.

## Features

* Display customer reward points
* Monthly reward point breakdown
* Search customers by name
* Debounced search for better performance
* Responsive UI
* Reward calculation utility functions

## Tech Stack

* React
* JavaScript (ES6+)
* CSS
* Custom Hooks

## Project Structure

src/
├── components/
│ ├── CustomerCard
│ ├── MonthlyPoints
│ └── SearchBar
├── hooks/
│ ├── useTransactions
│ └── useDebounce
├── utils/
│ ├── rewardCalculator
│ ├── logger
│ └── constants
├── App.js
└── index.js

## Utils

Contains business logic:

* Reward calculation
* Logger
* Constants

## Reward Points Rules

* 2 points for every dollar spent over $100
* 1 point for every dollar spent between $50 and $100

Example:

Transaction Amount: $120

Points:

* 50 points for amount between $50 and $100
* 40 points for amount above $100

Total: 90 points

## Installation

```bash
npm install
```

## Run Application

```bash
npm start
```

## Run Tests

```bash
npm test
```

## Future Improvements

* Pagination
* Sorting
* Export to CSV
* Unit test coverage
* Dark mode support

## Features
- Calculates customer rewards
- API using json-server
- Table UI
- Search with debounce
- Unit tested

## Installation
npm install

## Run App
npm start

## Run API
npm run server

## Run Tests
npm test

## coverage
npm test -- --coverage