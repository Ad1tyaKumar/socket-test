import express from 'express';
import requestIp from 'request-ip';
import axios from 'axios';
import geoip from 'geoip-lite';
import cors from 'cors';
import { Server } from 'socket.io';
import { testFunction } from './controller.js';
import router from './router.js';
import WebSocket from 'ws';
const app = express();

app.use(requestIp.mw())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.text());


// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Connection event handler
wss.on('connection', (ws, req) => {
    // Add new client to the set
    
    // Log connection info
    console.log(`New client connected.`);

    // Send welcome message to the connected client
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to WebSocket server',
        timestamp: new Date().toISOString()
    }));

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log(`Client disconnected.`);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server started on port 8080');

app.get("/", async (req, res) => {
    const ip = req.clientIp;
    const response = await axios.get('https://api.ipify.org?format=json');
    // console.log('User IP Address:', response.data.ip);
    console.log('hidden');

    const geo = geoip.lookup(response.data.ip);
    res.send({
        msg: `here is your IP: ${response.data.ip}`,
        res: response.data,
        geo
    })
})

app.get("/visible", async (req, res) => {
    console.log('visible');
    res.send({
        msg: "NOTHING"
    })
})

app.use("/", router);

app.listen(5000, () => {
    console.log('server is running');
})