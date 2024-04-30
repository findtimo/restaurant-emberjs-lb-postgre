# Restaurant Website

This repository contains the code for the restaurant website. It features an Ember.js frontend with user authentication, an IBM Loopback 3 backend for REST API services, and a PostgreSQL database.

## Technology Stack

- **Frontend**: Ember.js with Ember Simple Auth for user authentication.
- **Backend**: IBM Loopback 3 for REST API services.
- **Database**: PostgreSQL.

## Prerequisites

Before setting up the project, ensure you have the following installed:
- Node.js (https://nodejs.org/)
- Ember CLI (https://ember-cli.com/)
- PostgreSQL (https://www.postgresql.org/download/)
- IBM Loopback 3 (https://loopback.io/)

## Installation

1. **Clone the repository:**

2. **Run the Backend (Docker-compose):**
   ```bash
   docker-compose build --no-cache    #navigate to root folder
   docker-compose up

2. **Run the Frontend:**
   ```bash
   npm i    #navigate to ./restaurant-frontend/
   ember serve    #navigate to ./restaurant-frontend/
## Database Models
customers: Stores customer information.\
orders: Contains order details.\
foods: Lists available food items.\
orderMenu: Manages the many-to-many relationship between orders and menu items.

## API Calls
GET /api/customers: Retrieves a list of customers.\
POST /api/orders: Creates a new order.

See more from https://localhost:8080/explorer
## Authors

- [@findtimo](https://www.github.com/findtimo)

