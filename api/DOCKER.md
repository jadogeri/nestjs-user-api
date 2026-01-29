<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>NestJS User API - Docker Documentation</title>
</head>
<body>
    <h1>NestJS User API</h1>
    <p>This repository contains a production-ready Docker configuration for a NestJS application, featuring a multi-stage build and persistent SQLite storage.</p>
    <h2>🚀 Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li><a href="https://www.docker.com">Docker Desktop</a> installed.</li>
        <li><a href="https://docs.docker.com">Docker Compose</a> (included with Desktop).</li>
    </ul>
    <h3>1. Build and Launch</h3>
    <p>Run the following command to build the image and start the service in detached mode:</p>
    <pre><code>docker-compose up -d --build</code></pre>
    <h3>2. Access the API</h3>
    <p>The service will be available at:</p>
    <ul>
        <li><strong>URL:</strong> http://localhost:3001</li>
        <li><strong>Health Check:</strong> Check your specific health endpoint (e.g., <code>GET /</code>) to verify the status.</li>
    </ul>
    <hr>
    <h2>🛠️ Docker Configuration Details</h2>
    <h3>Multi-Stage Dockerfile</h3>
    <p>The build process is split into two stages to minimize the final image size and improve security:</p>
    <ol>
        <li><strong>Stage 1 (Build):</strong> Compiles the NestJS source code using the full development environment.</li>
        <li><strong>Stage 2 (Runtime):</strong>
            <ul>
                <li>Uses a slim <code>node:20-alpine</code> base.</li>
                <li>Installs only production dependencies (<code>npm ci --only=production</code>).</li>
                <li>Runs as a <strong>non-root user</strong> (<code>node</code>) for enhanced security.</li>
            </ul>
        </li>
    </ol>
    <h3>Service Specifications (<code>docker-compose.yml</code>)</h3>
    <ul>
        <li><strong>Container Name:</strong> <code>nestjs_user_api</code></li>
        <li><strong>Restart Policy:</strong> <code>always</code> (automatically restarts on failure or system reboot).</li>
        <li><strong>Port Mapping:</strong> Maps host port <code>3001</code> to container port <code>3001</code>.</li>
        <li><strong>Persistent Storage:</strong> Uses a named volume <code>sqlite_data</code> mapped to <code>/app/data</code> to ensure the SQLite database persists across container updates.</li>
    </ul>
    <hr>
    <h2>📂 Data Management</h2>
    <p>The SQLite database is stored inside the container at:</p>
    <code>/app/data/usersDB.sqlite</code>
    <p>To back up the database or view files inside the volume, you can use:</p>
    <pre><code>docker run --rm -v sqlite_data:/data alpine ls /data</code></pre>
</body>
</html>
