import axios from 'axios';
import { servers } from './constants';

let currentServerIndex = 0;
const requestData = "hi";

const sendRequest = async (timeStamp) => {
    let res = {
        timeStamp, 
        requestData, 
        server: `Server ${currentServerIndex+1}`, 
        response: '-'
    }

    try {
        // Attempt to send a request to the current server
        const currentServer = servers[currentServerIndex];
        const requestURL = currentServer + requestData;
        const response = await axios.get(requestURL);

        console.log(`Response from ${requestURL}: ${response.data}`);
        res = { ...res, response: response.data };

        // Only advance the server index if the request was successful
        currentServerIndex = (currentServerIndex + 1) % servers.length;
    } catch (error) {
        console.error(`Error communicating with ${servers[currentServerIndex]}: ${error.message}`);

        // Attempt to send a request to the other server if the current one fails
        const fallbackServerIndex = (currentServerIndex + 1) % servers.length;
        try {
            const fallbackServer = servers[fallbackServerIndex];
            const requestURL = fallbackServer + requestData;
            const response = await axios.get(requestURL);

            console.log(`Response from ${requestURL}: ${response.data}`);
            res = { ...res,server: `${res.server}>` , response: response.data };

            // If the fallback server succeeds, set the current index to the fallback server
            currentServerIndex = fallbackServerIndex;
        } catch (err) {
            currentServerIndex = (currentServerIndex + 1) % servers.length;
            console.error(`Error communicating with both servers: ${err.message}`);
        }
    }

    return res;
};

export default sendRequest;
