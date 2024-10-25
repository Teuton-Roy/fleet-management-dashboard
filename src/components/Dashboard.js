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
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">EV Fleet Management Dashboard</h1>

            {/* Vehicle Form for adding and updating vehicles */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add/Update Vehicle</h2>
                <VehicleForm onSubmit={handleAddOrUpdateVehicle} />
            </div>

            {/* Fleet Overview component showing summary statistics */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Fleet Overview</h2>
                <FleetOverview
                    vehicles={vehicles}
                    averageBattery={averageBattery}
                    lowBatteryCount={lowBatteryCount}
                />
            </div>

            {/* Fleet Dashboard showing individual vehicle details */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Fleet Dashboard</h2>
                <FleetDashboard vehicles={vehicles} onRemoveVehicle={handleRemoveVehicle} />
            </div>

            {/* VehicleStatusUpdater for real-time status simulation */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Real-Time Vehicle Status</h2>
                <VehicleStatusUpdater vehicles={vehicles} updateVehicle={handleUpdateVehicle} />
            </div>

            {/* Charging Scheduler */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Charging Scheduler</h2>
                <ChargingScheduler />
            </div>
        </div>
    );
}

export default Dashboard;
