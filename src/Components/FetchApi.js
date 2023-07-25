import React, { useEffect, useState } from "react";
import './API/FetchApi.css';

function FetchApi() {
  const [data, setData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);

  const apiGet = () => {
    fetch("http://192.168.10.13:8000/files/all?page=1&size=50")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.items); // Access the "items" array from the response
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    apiGet();
  }, []);

  const handleFileSelect = (fileName) => {
    setSelectedFileName(fileName);
    // Find the selected file details from the data array
    const selectedFile = data.find((item) => item.file_name === fileName);
    setSelectedFileDetails(selectedFile);
  };

  // Helper function to split date and time
  const splitDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    // Extracting date and time components
    const formattedDate = dateTime.toDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div>
      My API 
      
      <br />
      <div>
        <label>Select Audio File:</label>
        <select
          value={selectedFileName}
          onChange={(e) => handleFileSelect(e.target.value)}
        >
          <option value="">Select an audio file</option>
          {data.map((item) => (
            <option key={item.file_name} value={item.file_name}>
              {item.file_name}
            </option>
          ))}
        </select>
      </div>
      {selectedFileDetails && (
        <div className="horizontal-table">
          <h2>Selected Audio File Details:</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>File name</th>
                <th>Machine name</th>
                <th>Comment Date</th>
                <th>Deleted</th>
                <th>File created date</th>
                <th>File created time</th>
                <th>Sensor type</th>
                <th>Sensor id</th>
                <th>Comment</th>
                <th>Anomaly flag</th>
                <th>Model validation Check</th>
                <th>Model check date</th>
                <th>Model check time</th>
              </tr>
            </thead>
            <tbody>
              {/* Render the selectedFileDetails data */}
              <tr>
                <td>{selectedFileDetails.file_name}</td>
                <td>{selectedFileDetails.machine_name}</td>
                <td>{selectedFileDetails.comment_date}</td>
                <td>{selectedFileDetails.deleted}</td>
                <td>
                  {splitDateTime(selectedFileDetails.file_created_date).date}
                </td>
                <td>
                  {splitDateTime(selectedFileDetails.file_created_date).time}
                </td>
                <td>{selectedFileDetails.sensor_type}</td>
                <td>{selectedFileDetails.sensor_id}</td>
                <td>{selectedFileDetails.comment}</td>
                <td>{selectedFileDetails.anomaly_flag}</td>
                <td>{selectedFileDetails.model_validation_check}</td>
                <td>
                  {(selectedFileDetails.model_check_date)}
                </td>
                <td>
                  {(selectedFileDetails.model_check_date)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FetchApi;
