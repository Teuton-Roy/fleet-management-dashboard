import React, { useState, useEffect } from 'react';
import VehicleForm from './VehicleForm';
import FleetDashboard from './FleetDashboard';
import FleetOverview from './FleetOverview';
import VehicleStatusUpdater from './VehicleStatusUpdater';
import ChargingScheduler from './ChargingScheduler';
import {
  getVehicles,
  addOrUpdateVehicle,
  removeVehicle,
  getAverageBattery,
  getLowBatteryCount
} from '../Utility/vehicleData';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  // Load vehicles initially from local storage
  useEffect(() => {
    const initialVehicles = getVehicles();
    setVehicles(initialVehicles);
  }, []);

  // Add or update a vehicle
  const handleAddOrUpdateVehicle = (vehicle) => {
    addOrUpdateVehicle(vehicle);        // Save to local storage
    setVehicles(getVehicles());         // Refresh state with updated list
  };

  // Remove a vehicle
  const handleRemoveVehicle = (id) => {
    removeVehicle(id);                  // Remove from local storage
    setVehicles(getVehicles());         // Refresh state with updated list
  };

  // Update a specific vehicle’s status or battery in real-time
  const handleUpdateVehicle = (updatedVehicle) => {
    addOrUpdateVehicle(updatedVehicle); // Update in local storage
    setVehicles(getVehicles());         // Refresh state with updated list
  };

  // Calculate metrics for FleetOverview
  const averageBattery = getAverageBattery();
  const lowBatteryCount = getLowBatteryCount(20);

  return (
    <div className="dashboard">
      <h1>EV Fleet Management Dashboard</h1>

      {/* Vehicle Form for adding and updating vehicles */}
      <VehicleForm onSubmit={handleAddOrUpdateVehicle} />

      {/* Fleet Overview component showing summary statistics */}
      <FleetOverview 
        vehicles={vehicles} 
        averageBattery={averageBattery} 
        lowBatteryCount={lowBatteryCount} 
      />

      {/* Fleet Dashboard showing individual vehicle details */}
      <FleetDashboard vehicles={vehicles} onRemoveVehicle={handleRemoveVehicle} />

      {/* VehicleStatusUpdater for real-time status simulation */}
      <VehicleStatusUpdater vehicles={vehicles} updateVehicle={handleUpdateVehicle} />

      
      <ChargingScheduler />
    </div>
  );
}

export default Dashboard;