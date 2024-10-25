import React, { useState, useEffect } from 'react';
import { Activity, Battery, Plus, Bell, Settings, Menu, ChevronDown, Users, Truck, Zap } from 'lucide-react';
import VehicleForm from './VehicleForm';
import FleetDashboard from './FleetDashboard';
// import FleetOverview from './FleetOverview';
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Fleet Command Center</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center border-2 border-white dark:border-gray-800">
                    {alerts.length}
                  </span>
                )}
              </button>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                // className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                {/* <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Fleet Manager</p>
                </div> */}
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 mt-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'} shadow-lg`}>
        <div className="p-4">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium transition-colors duration-200">
              <Activity className="h-5 w-5" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200">
              <Battery className="h-5 w-5" />
              {isSidebarOpen && <span>Charging</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200">
              <Users className="h-5 w-5" />
              {isSidebarOpen && <span>Drivers</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200">
              <Settings className="h-5 w-5" />
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-20 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Overview</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Monitor and manage your entire fleet in real-time</p>
          </div>

          {/* Alerts Section */}
          {alerts.length > 0 && (
            <div className="mb-6 space-y-2">
              {alerts.map((alert) => (
                <Alert key={alert.id} variant="destructive" className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <AlertDescription className="text-red-800 dark:text-red-200">{alert.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{vehicles.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Battery</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageBattery.toFixed(1)}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Battery Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowBatteryCount}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Dashboard */}
          <Card className="mb-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fleet Status</h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Vehicle
              </button>
            </div>
            <FleetDashboard
              vehicles={vehicles}
              onVehicleSelect={handleVehicleSelect}
            />
          </Card>

          {/* Charging Scheduler */}
          <Card className="mb-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Charging Schedule</h3>
            <ChargingScheduler
              vehicles={vehicles}
              onScheduleCharging={handleScheduleCharging}
            />
          </Card>
        </div>
      </main>

      {/* Add Vehicle Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
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

      {/* Status Updater Component */}
      <VehicleStatusUpdater
        vehicles={vehicles}
        updateVehicle={handleStatusUpdate}
      />
    </div>
  );
};

export default Dashboard;