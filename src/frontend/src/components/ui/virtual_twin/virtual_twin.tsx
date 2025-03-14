import './virtual_twin.css';

// Dashboard.tsx
import React, { useEffect, useState, JSX } from 'react';
// Import the diagram image from assets
import diagramImage from '@assets/flow.png'



// Define a generic type for the dashboard data.
// You can refine this type as needed.
type DashboardData = Record<string, any>;

const VirtualTwin: React.FC = () => {
  // State for one-time snapshot data
  const [snapshotData, setSnapshotData] = useState<DashboardData | null>(null);
  // State for real-time data (received via WebSocket)
  const [realtimeData, setRealtimeData] = useState<DashboardData | null>(null);
  // State for any alert message
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 1. Fetch snapshot data once on mount
  useEffect(() => {
    fetch('http://localhost:8000/process_data')
      .then((response) => response.json())
      .then((data: DashboardData) => {
        console.log('Snapshot data:', data);
        setSnapshotData(data);
      })
      .catch((error) => {
        console.error('Error fetching snapshot data:', error);
      });
  }, []);

  // 2. WebSocket for continuous updates
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data) as {
          data?: DashboardData;
          alert?: string;
        };
        console.log('Real-time data:', messageData);

        if (messageData.data) {
          setRealtimeData(messageData.data);
        }
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

    return () => {
      ws.close();
    };
  }, []);

  // Helper function to render a data object (component metrics)
  const renderMetrics = (dataObj: Record<string, any>): JSX.Element => {
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
  const renderComponents = (dataObj: Record<string, any>): JSX.Element[] => {
    return Object.entries(dataObj).map(([componentName, metrics]) => (
      <div key={componentName} style={{ margin: '1rem 0' }}>
        <h3>{componentName}</h3>
        {renderMetrics(metrics)}
      </div>
    ));
  };

  // Example logic to decide color for each component’s “light”
  // Adjust the thresholds as needed.
  const getBlastFurnaceColor = (): string => {
    if (!realtimeData || !realtimeData.blast_furnace) return 'gray';
    const temp = realtimeData.blast_furnace.bf_temperature;
    return temp > 1550 ? 'red' : 'green';
  };

  const getCokeOvensColor = (): string => {
    if (!realtimeData || !realtimeData.coke_ovens) return 'gray';
    const temp = realtimeData.coke_ovens.temperature;
    return temp > 1100 ? 'red' : 'green';
  };

  const getStovesColor = (): string => {
    if (!realtimeData || !realtimeData.stoves) return 'gray';
    const temp = realtimeData.stoves.stove_temp;
    return temp > 1200 ? 'red' : 'green';
  };

  const getBOSColor = (): string => {
    if (!realtimeData || !realtimeData.bos) return 'gray';
    const temp = realtimeData.bos.bos_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getStoverColor = (): string => {
    if (!realtimeData || !realtimeData.stover) return 'gray';
    const temp = realtimeData.stover.stover_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getPowerPlantColor = (): string => {
    if (!realtimeData || !realtimeData.power_plant) return 'gray';
    const temp = realtimeData.power_plant.power_plant_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getSinterPlantColor = (): string => {
    if (!realtimeData || !realtimeData.sinter_plant) return 'gray';
    const temp = realtimeData.sinter_plant.sinter_plant_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getLimePlantColor = (): string => {
    if (!realtimeData || !realtimeData.lime_plant) return 'gray';
    const temp = realtimeData.lime_plant.lime_plant_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getOxygenPlantColor = (): string => {
    if (!realtimeData || !realtimeData.oxygen_plant) return 'gray';
    const temp = realtimeData.oxygen_plant.oxygen_plant_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const getBlowersColor = (): string => {
    if (!realtimeData || !realtimeData.blowers) return 'gray';
    const temp = realtimeData.blowers.blowers_temperature;
    return temp > 1500 ? 'red' : 'green';
  };

  const handleAlertAction = (): void => {
    // For example, redirect to a chat or an incident management page
    window.location.href = '/chat';
  };

  return (
    <div className="dashboard-container">
      <h1>Steel Plant Dashboard</h1>

      {/* Diagram with Overlays */}
      <div className="diagram-container">
        <img src={diagramImage} alt="Steel plant diagram" className="diagram-image" />

        {/* Blast Furnace Indicator */}
        <div
          className="status-indicator blast-furnace-indicator"
          style={{ backgroundColor: getBlastFurnaceColor() }}
          title="Blast Furnace"
        />

        {/* Coke Ovens Indicator */}
        <div
          className="status-indicator coke-ovens-indicator"
          style={{ backgroundColor: getCokeOvensColor() }}
          title="Coke Ovens"
        />

        {/* Stoves Indicator */}
        <div
          className="status-indicator stoves-indicator"
          style={{ backgroundColor: getStovesColor() }}
          title="Stoves"
        />
      </div>

      {/* Additional indicators outside the diagram-container */}
      <div
        className="status-indicator bos-indicator"
        style={{ backgroundColor: getBOSColor() }}
        title="BOS"
      />

      <div
        className="status-indicator stover-indicator"
        style={{ backgroundColor: getStoverColor() }}
        title="Stover"
      />

      <div
        className="status-indicator power_plant-indicator"
        style={{ backgroundColor: getPowerPlantColor() }}
        title="Power Plant"
      />

      <div
        className="status-indicator sinter_plant-indicator"
        style={{ backgroundColor: getSinterPlantColor() }}
        title="Sinter Plant"
      />

      <div
        className="status-indicator lime_plant-indicator"
        style={{ backgroundColor: getLimePlantColor() }}
        title="Lime Plant"
      />

      <div
        className="status-indicator oxygen_plant-indicator"
        style={{ backgroundColor: getOxygenPlantColor() }}
        title="Oxygen Plant"
      />

      <div
        className="status-indicator blowers-indicator"
        style={{ backgroundColor: getBlowersColor() }}
        title="Blowers"
      />

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
        <div className="notification is-danger">
          <strong>ALERT:</strong> {alertMessage}
          <button className="take_action" onClick={handleAlertAction}>
            Take Action
          </button>
        </div>
      )}
    </div>
  );
};

export default VirtualTwin;
