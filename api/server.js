const express = require('express');
const server = express();
const blogRouter = require('../blogPostRoutes/blogRouter');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h2>Jackon's Blog</h2>
        <p>Welcome to Jackson's Blog Collection</p>`
    )
})

server.use('/api/posts', blogRouter);

module.exports = server;