import React, { useState, useEffect } from 'react';
import VehicleForm from './VehicleForm';
import FleetDashboard from './FleetDashboard';
import FleetOverview from './FleetOverview';
import VehicleStatusUpdater from './VehicleStatusUpdater';


function Dashboard() {
    const [vehicles, setVehicles] = useState([]);

    // Load initial vehicle data from local storage or set an empty array
    useEffect(() => {
        const savedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        setVehicles(savedVehicles);
    }, []);


    // Save vehicle data to local storage whenever there's an update
    useEffect(() => {
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }, [vehicles]);

    // Add or update a vehicle in the fleet
    const handleAddOrUpdateVehicle = (vehicle) => {
        setVehicles((prevVehicles) => {
            const vehicleExists = prevVehicles.some((v) => v.id === vehicle.id);
            if (vehicleExists) {
                return prevVehicles.map((v) => (v.id === vehicle.id ? vehicle : v));
            }
            return [...prevVehicles, vehicle];
        });
    };


    // Remove a vehicle from the fleet
    const handleRemoveVehicle = (id) => {
        setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
    };

    // Update a single vehicle's data
    const handleUpdateVehicle = (updatedVehicle) => {
        setVehicles((prevVehicles) =>
            prevVehicles.map((vehicle) =>
                vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
            )
        );
    };

    return (
        <>
            <h1>EV Fleet Management Dashboard</h1>

            {/* Vehicle Form for adding and updating vehicles */}
            <VehicleForm onSubmit={handleAddOrUpdateVehicle} />

            {/* Fleet Overview component showing summary statistics */}
            <FleetOverview vehicles={vehicles} />

            {/* Fleet Dashboard showing individual vehicle details */}
            <FleetDashboard vehicles={vehicles} onRemoveVehicle={handleRemoveVehicle} />

            {/* VehicleStatusUpdater for real-time status simulation */}
            <VehicleStatusUpdater vehicles={vehicles} updateVehicle={handleUpdateVehicle} />
        </>
    );
}

export default Dashboard;
