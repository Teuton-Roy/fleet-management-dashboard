import React, { useState, useEffect } from 'react';
import { Activity, Battery, Plus, Bell, Settings, Menu } from 'lucide-react';
import VehicleForm from './VehicleForm';
import FleetDashboard from './FleetDashboard';
import FleetOverview from './FleetOverview';
import VehicleStatusUpdater from './VehicleStatusUpdater';
import ChargingScheduler from './ChargingScheduler';
import { getVehicles, addOrUpdateVehicle, getAverageBattery, getLowBatteryCount } from '../Utility/vehicleData';
import { Alert, AlertDescription } from '../UI/alert';
import { Card } from '../UI/card';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const loadVehicles = () => {
    const loadedVehicles = getVehicles();
    setVehicles(loadedVehicles);
    checkBatteryAlerts(loadedVehicles);
  };

  useEffect(() => {
    const loadVehicles = () => {
      const loadedVehicles = getVehicles();
      setVehicles(loadedVehicles);
      checkBatteryAlerts(loadedVehicles);
    };
    
    loadVehicles();
  }, []);

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-30">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Fleet Management</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
              <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Settings className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 mt-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4">
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Activity className="h-5 w-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Battery className="h-5 w-5" />
              {isSidebarOpen && <span>Charging</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-6">
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

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Vehicles</h3>
              <p className="text-3xl font-bold">{vehicles.length}</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Average Battery</h3>
              <p className="text-3xl font-bold">{averageBattery.toFixed(1)}%</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
              <h3 className="text-lg font-semibold mb-2">Low Battery Vehicles</h3>
              <p className="text-3xl font-bold">{lowBatteryCount}</p>
            </Card>
          </div>

          {/* Overview Section */}
          <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
            <FleetOverview
              vehicles={vehicles}
              averageBattery={averageBattery}
              lowBatteryCount={lowBatteryCount}
            />
          </Card>

          {/* Main Dashboard */}
          <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
            <FleetDashboard
              vehicles={vehicles}
              onVehicleSelect={handleVehicleSelect}
            />
          </Card>

          {/* Charging Scheduler */}
          <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
            <ChargingScheduler
              vehicles={vehicles}
              onScheduleCharging={handleScheduleCharging}
            />
          </Card>
        </div>
      </main>

      {/* Add Vehicle Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800">
            <VehicleForm
              onSubmit={handleVehicleSubmit}
              initialData={selectedVehicle}
              onCancel={() => {
                setShowAddForm(false);
                setSelectedVehicle(null);
              }}
            />
          </Card>
        </div>
      )}

      {/* Add Vehicle Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Status Updater Component */}
      <VehicleStatusUpdater
        vehicles={vehicles}
        updateVehicle={handleStatusUpdate}
      />
    </div>
  );
};

export default Dashboard;