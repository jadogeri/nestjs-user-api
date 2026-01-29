

NestJS SQLite API
=================

By **Your Name** | January 29, 2026

[![Project Screenshot](https://via.placeholder.com)](https://github.com)

_Click the image to view the full repository._

🚀 Overview
-----------

A high-performance RESTful API built with **NestJS** and **SQLite**, designed for containerized deployment.

🛠 Technology Stack
-------------------

*   **Framework:** [NestJS](https://nestjs.com)
*   **Database:** [SQLite](https://www.sqlite.org)
*   **ORM:** [TypeORM](https://typeorm.io)
*   **Runtime:** [Node.js](https://nodejs.org)
*   **Containerization:** [Docker](https://www.docker.com)

📦 Getting Started
------------------

### Prerequisites

*   [Docker Desktop](https://www.docker.comproducts/docker-desktop/)
*   Node.js (for local development)

### Deployment with Docker

Run the entire stack using the following command:

    docker-compose up --build

🗄 Database Management
----------------------

*   **Migrations:** View the detailed [MIGRATIONS.md](./MIGRATIONS.md) for schema history.
*   **Seeding Data:** Populate the database with initial records:

    # Local
    npm run seed
    
    # Via Docker
    docker-compose exec api npm run seed

🧪 Testing
----------

Run the comprehensive test suite to ensure stability:

    # Unit tests
    npm run test
    
    # End-to-end (e2e) tests
    npm run test:e2e

📜 Acknowledgements
-------------------

*   [NestJS Documentation](https://docs.nestjs.com)
*   [Docker Hub Node Images](https://hub.docker.com)