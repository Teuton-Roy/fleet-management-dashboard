import React from 'react';

function FleetDashboard({ vehicles }) {
  return (
    <div className="fleet-dashboard">
      {vehicles.map(vehicle => (
        <div key={vehicle.id} className={`vehicle-card ${vehicle.battery < 15 ? 'critical' : ''}`}>
          <h3>{vehicle.id}</h3>
          <p>Battery: {vehicle.battery}%</p>
          <p>Status: {vehicle.status}</p>
        </div>
      ))}
    </div>
  );
}

export default FleetDashboard;