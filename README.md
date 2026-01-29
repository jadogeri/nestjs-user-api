<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NestJS SQLite API Documentation</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292e; max-width: 880px; margin: 0 auto; padding: 45px; }
        h1, h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code { background-color: rgba(27,31,35,0.05); border-radius: 3px; padding: 0.2em 0.4em; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; }
        pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
        img { max-width: 100%; border-radius: 6px; border: 1px solid #ddd; }
        .author-info { color: #586069; margin-top: -15px; margin-bottom: 30px; font-style: italic; }
    </style>
</head>
<body>

    <h1>NestJS SQLite API</h1>
    <div class="author-info">
        By <strong>Your Name</strong> | January 29, 2026
    </div>

    <a href="https://github.com">
        <img src="https://via.placeholder.com" alt="Project Screenshot">
    </a>
    <p><em>Click the image to view the full repository.</em></p>

    <h2>🚀 Overview</h2>
    <p>A high-performance RESTful API built with <strong>NestJS</strong> and <strong>SQLite</strong>, designed for containerized deployment.</p>

    <h2>🛠 Technology Stack</h2>
    <ul>
        <li><strong>Framework:</strong> <a href="https://nestjs.com">NestJS</a></li>
        <li><strong>Database:</strong> <a href="https://www.sqlite.org">SQLite</a></li>
        <li><strong>ORM:</strong> <a href="https://typeorm.io">TypeORM</a></li>
        <li><strong>Runtime:</strong> <a href="https://nodejs.org">Node.js</a></li>
        <li><strong>Containerization:</strong> <a href="https://www.docker.com">Docker</a></li>
    </ul>

    <h2>📦 Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li><a href="https://www.docker.comproducts/docker-desktop/">Docker Desktop</a></li>
        <li>Node.js (for local development)</li>
    </ul>

    <h3>Deployment with Docker</h3>
    <p>Run the entire stack using the following command:</p>
    <pre><code>docker-compose up --build</code></pre>

    <h2>🗄 Database Management</h2>
    <ul>
        <li><strong>Migrations:</strong> View the detailed <a href="./MIGRATIONS.md">MIGRATIONS.md</a> for schema history.</li>
        <li><strong>Seeding Data:</strong> Populate the database with initial records:</li>
    </ul>
    <pre><code># Local
npm run seed

# Via Docker
docker-compose exec api npm run seed</code></pre>

    <h2>🧪 Testing</h2>
    <p>Run the comprehensive test suite to ensure stability:</p>
    <pre><code># Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e</code></pre>

    <h2>📜 Acknowledgements</h2>
    <ul>
        <li><a href="https://docs.nestjs.com">NestJS Documentation</a></li>
        <li><a href="https://hub.docker.com">Docker Hub Node Images</a></li>
    </ul>

</body>
</html>
