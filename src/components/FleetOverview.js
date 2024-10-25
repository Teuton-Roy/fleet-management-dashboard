import React from 'react';

function FleetOverview({ vehicles }) {
  const totalVehicles = vehicles.length;
  const averageBattery = vehicles.reduce((acc, vehicle) => acc + vehicle.battery, 0) / totalVehicles;
  const lowBatteryVehicles = vehicles.filter(vehicle => vehicle.battery < 20).length;

  return (
    <div>
      <h3>Total Vehicles: {totalVehicles}</h3>
      <h3>Average Battery: {averageBattery.toFixed(2)}%</h3>
      <h3>Vehicles with Battery 20%: {lowBatteryVehicles}</h3>
    </div>
  );
}

export default FleetOverview;