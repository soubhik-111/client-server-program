import axios from 'axios';
import { servers } from './constants';

let currentServerIndex = 0;

const sendRequest = async (timeStamp) => {
    const currentServer = servers[currentServerIndex];
    const requestData = "hi";
    const requestURL = currentServer+requestData;

    let res = {
        timeStamp, 
        requestData, 
        server: `Server ${currentServerIndex+1}`, 
        response: '-'
    }

    try {    
        const response = await axios.get(requestURL, requestData);
        console.log(`Response from ${requestURL}: ${response.data}`);

        
        res = { ...res, response: response.data }
    } catch (error) {
        console.error(`Error communicating with server: ${error.message}`);
    }
    
    // Move to the next server in the round-robin
    currentServerIndex = (currentServerIndex + 1) % servers.length;
    return res;
    
};

export default sendRequest;
