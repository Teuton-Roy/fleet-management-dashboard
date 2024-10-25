import React from 'react';

function FleetOverview({ vehicles, averageBattery, lowBatteryCount }) {
  return (
    <div>
      <h3>Total Vehicles: {vehicles.length}</h3>
      <h3>Average Battery: {averageBattery.toFixed(2)}%</h3>
      <h3>Vehicles with Battery 20%: {lowBatteryCount}</h3>
    </div>
  );
}

export default FleetOverview;