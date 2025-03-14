import React, { useEffect, useState } from 'react';

function Dashboard() {
  // State for one-time snapshot data
  const [snapshotData, setSnapshotData] = useState(null);

  // State for real-time data (received via WebSocket)
  const [realtimeData, setRealtimeData] = useState(null);

  // State for any alert message
  const [alertMessage, setAlertMessage] = useState(null);

  // 1. Fetch snapshot data once on mount
  useEffect(() => {
    fetch('http://localhost:8000/process_data')
      .then((response) => response.json())
      .then((data) => {
        console.log('Snapshot data:', data);
        setSnapshotData(data);
      })
      .catch((error) => {
        console.error('Error fetching snapshot data:', error);
      });
  }, []);

  // 2. WebSocket for continuous updates
  useEffect(() => {
    // Open WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws');

    // When a message is received from the server
    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        // messageData should have { timestamp, data, alert }
        console.log('Real-time data:', messageData);

        // Update real-time data
        if (messageData.data) {
          setRealtimeData(messageData.data);
        }

        // If there is an alert, update alertMessage
        if (messageData.alert) {
          setAlertMessage(messageData.alert);
        } else {
          setAlertMessage(null);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // Helper function to render a data object (component metrics)
  const renderMetrics = (dataObj) => {
    return (
      <ul>
        {Object.entries(dataObj).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  // Renders a section for each component
  const renderComponents = (dataObj) => {
    return Object.entries(dataObj).map(([componentName, metrics]) => (
      <div key={componentName} style={{ margin: '1rem 0' }}>
        <h3>{componentName}</h3>
        {renderMetrics(metrics)}
      </div>
    ));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Steel Plant Dashboard</h1>

      {/* Snapshot Data */}
      {snapshotData && (
        <div>
          <h2>Snapshot Data</h2>
          {renderComponents(snapshotData)}
        </div>
      )}

      {/* Real-time Data */}
      {realtimeData && (
        <div>
          <h2>Real-Time Data</h2>
          {renderComponents(realtimeData)}
        </div>
      )}

      {/* Alert Message */}
      {alertMessage && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>ALERT:</strong> {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
