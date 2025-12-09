
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const request = require('request');


// Replace this with the target server URL
const targetUrl = 'https://api.backpack.exchange/api/v1/';

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

app.get(new RegExp('.*'), (req, res) => {
    const path = req.originalUrl.substring(1)
    const fullPath = targetUrl + req.originalUrl.substring(1)
    try {

        request(
            { url:fullPath },
            (error, response, body) => {
                // if (error || response.statusCode !== 200) {
                //     return res.status(500).json({ type: 'error', message: error.message });
                // }
                if (error) {
            // A network or other request-related error occurred
            return res.status(500).json({ type: 'error', message: error.message });
        }
        
        if (response.statusCode !== 200) {
            // A non-200 HTTP status code was received
            return res.status(response.statusCode).json({ 
                type: 'error', 
                message: `API responded with status code: ${response.statusCode}` 
            });
        }
                
                res.json(body);
            }
        )
    }catch(e){
        console.log(e)
    }
});


const port = 8080;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
