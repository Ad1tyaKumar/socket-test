import express from 'express';
import requestIp from 'request-ip';
import axios from 'axios';
import geoip from 'geoip-lite';
import cors from 'cors';
import { Server } from 'socket.io';
import { testFunction } from './controller.js';

const app = express();

app.use(requestIp.mw())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




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

app.get("/test", testFunction);



const server = app.listen(5000, () => {
    console.log('server is running');
})
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let res = [];
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('questionVisited', (data) => {
        res.push(data);
        console.log(res);

        console.log('Data received from client:', data);
    });

    socket.on('disconnect', () => {
        console.log(res);
        console.log('user disconnected');
    });
});
