import React, { useState, useEffect } from 'react';
import VehicleForm from './VehicleForm';
import FleetDashboard from './FleetDashboard';
import FleetOverview from './FleetOverview';
import VehicleStatusUpdater from './VehicleStatusUpdater';
import ChargingScheduler from './ChargingScheduler';
import { getVehicles, addOrUpdateVehicle, getAverageBattery, getLowBatteryCount } from '../Utility/vehicleData';
import { Alert, AlertDescription } from '../UI/alert';
import { Card } from '../UI/card';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    const loadedVehicles = getVehicles();
    setVehicles(loadedVehicles);
    checkBatteryAlerts(loadedVehicles);
  };

  const checkBatteryAlerts = (vehicleList) => {
    const newAlerts = vehicleList
      .filter(v => v.battery < 15)
      .map(v => ({
        id: v.id,
        message: `Vehicle ${v.id} has critically low battery (${v.battery}%)`
      }));
    setAlerts(newAlerts);
  };

  const handleVehicleSubmit = (vehicleData) => {
    addOrUpdateVehicle(vehicleData);
    loadVehicles();
    setShowAddForm(false);
    setSelectedVehicle(null);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowAddForm(true);
  };

  const handleStatusUpdate = (updatedVehicle) => {
    addOrUpdateVehicle(updatedVehicle);
    loadVehicles();
  };

  const handleScheduleCharging = (vehicleId, scheduleTime) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      addOrUpdateVehicle({
        ...vehicle,
        scheduledCharge: scheduleTime
      });
      loadVehicles();
    }
  };

  const averageBattery = getAverageBattery();
  const lowBatteryCount = getLowBatteryCount();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Fleet Management Dashboard</h1>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant="destructive" className="mb-2">
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Overview Section */}
      <Card className="mb-6 p-4">
        <FleetOverview
          vehicles={vehicles}
          averageBattery={averageBattery}
          lowBatteryCount={lowBatteryCount}
        />
      </Card>

      {/* Main Dashboard */}
      <Card className="mb-6 p-4">
        <FleetDashboard
          vehicles={vehicles}
          onVehicleSelect={handleVehicleSelect}
        />
      </Card>

      {/* Vehicle Form */}
      {showAddForm && (
        <Card className="mb-6 p-4">
          <VehicleForm
            onSubmit={handleVehicleSubmit}
            initialData={selectedVehicle}
            onCancel={() => {
              setShowAddForm(false);
              setSelectedVehicle(null);
            }}
          />
        </Card>
      )}

      {/* Charging Scheduler */}
      <Card className="mb-6 p-4">
        <ChargingScheduler
          vehicles={vehicles}
          onScheduleCharging={handleScheduleCharging}
        />
      </Card>

      {/* Status Updater Component (invisible) */}
      <VehicleStatusUpdater
        vehicles={vehicles}
        updateVehicle={handleStatusUpdate}
      />

      {/* Add Vehicle Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        + Add Vehicle
      </button>
    </div>
  );
}

export default Dashboard;