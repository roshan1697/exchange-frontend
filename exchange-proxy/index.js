
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const request = require('request');


// Replace this with the target server URL
const targetUrl = 'https://api.backpack.exchange/api/v1';

// Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
    next();
});

// app.use('/', createProxyMiddleware({
//     target: targetUrl,
//     changeOrigin: true,
//     onProxyReq: (proxyReq, req, res) => {
//         // Optionally, you can modify the request here
//     },
//     onProxyRes: (proxyRes, req, res) => {
//         // Optionally, you can modify the response here
//     }
// }));

app.get('/:path', (req, res) => {
    const path = req.params.path
    request(
        { url:targetUrl + path },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            
            
            res.json(body);
        }
    )
});


const port = 8080;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
