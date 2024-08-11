const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors())

app.use(express.json());

const getTimeStamp = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeStamp = `${day}-${month}-${year} - ${hours}:${minutes}:${seconds}`;
    return timeStamp;
} 

app.get('/:msg', (req, res) => {
    const requestData = req.params.msg;
    const logMessage = `${getTimeStamp()} "< ${requestData}"\n`;

    // Log the incoming request
    fs.appendFileSync('server2.log', logMessage);

    const responseMessage = "hello";
    res.status(200).send(responseMessage);

    // Log the outgoing response
    const logResponse = `${getTimeStamp()} "> ${responseMessage}"\n`;
    fs.appendFileSync('server2.log', logResponse);
});

app.listen(PORT, () => {
    console.log(`Server 2 is running on port ${PORT}`);
});
