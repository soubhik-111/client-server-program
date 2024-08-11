import {useEffect, useState} from 'react';
import './App.css';
import sendRequest from './request';

let timer = null;

function App() {

  const [resdata, setResData] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    handleStart();
    return handleStop;
  },[])

  const handleStart = () => {
    timer = setInterval(requestData,1000);
    setIsStarted(true);
  }

  const handleStop = () => {
    clearInterval(timer);
    setIsStarted(false);
  }

  const requestData = async () => {
    console.log("Requesting Data.....");
    const timeStamp = getTimeStamp();
    const data = await sendRequest(timeStamp);
    setResData((prevData) => [data, ...prevData])
  }

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

  return (
    <div className="App">
      <header className="App-header">
        <div className='header'>
          {isStarted ? 
            <button onClick={handleStop}>Stop</button> :
            <button onClick={handleStart}>Start</button>
          }
        </div>
        <br/>
        <table>
          <caption>{resdata.length ? "Requests Data" : "No Data Exists" }</caption>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Request</th>
              <th>Server</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {resdata.length > 0 &&  resdata.map(row => 
              <tr key={row.timeStamp}>
                <td>{row.timeStamp}</td>
                <td>{row.requestData}</td>
                <td>{row.server}</td>
                <td>{row.response}</td>
              </tr>)
            }
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
