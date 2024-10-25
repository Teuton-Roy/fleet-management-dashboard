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
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const initialVehicles = getVehicles();
        setVehicles(initialVehicles);
    }, []);

    const handleAddOrUpdateVehicle = (vehicle) => {
        addOrUpdateVehicle(vehicle);
        setVehicles(getVehicles());
    };

    const handleRemoveVehicle = (id) => {
        removeVehicle(id);
        setVehicles(getVehicles());
    };

    const handleUpdateVehicle = (updatedVehicle) => {
        addOrUpdateVehicle(updatedVehicle);
        setVehicles(getVehicles());
    };

    const averageBattery = getAverageBattery();
    const lowBatteryCount = getLowBatteryCount(20);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
        { id: 'status', label: 'Status', icon: '🔋' },
        { id: 'schedule', label: 'Schedule', icon: '📅' },
        { id: 'manage', label: 'Manage', icon: '⚙️' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <FleetOverview
                        vehicles={vehicles}
                        averageBattery={averageBattery}
                        lowBatteryCount={lowBatteryCount}
                    />
                );
            case 'vehicles':
                return (
                    <FleetDashboard
                        vehicles={vehicles}
                        onRemoveVehicle={handleRemoveVehicle}
                    />
                );
            case 'status':
                return (
                    <VehicleStatusUpdater
                        vehicles={vehicles}
                        updateVehicle={handleUpdateVehicle}
                    />
                );
            case 'schedule':
                return <ChargingScheduler />;
            case 'manage':
                return <VehicleForm onSubmit={handleAddOrUpdateVehicle} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Background Pattern Overlay */}
            <div 
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Content Container */}
            <div className="relative container mx-auto px-4 py-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white font-sans">
                                    EV Fleet Management
                                </h1>
                                <p className="text-blue-200 text-sm">
                                    Monitoring and managing your electric vehicle fleet
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 bg-blue-600/90 px-6 py-3 rounded-lg shadow-lg">
                                <span className="text-xl">🔋</span>
                                <span className="text-xl font-semibold text-white">
                                    {averageBattery}% Avg Battery
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-red-500/90 px-6 py-3 rounded-lg shadow-lg">
                                <span className="text-xl">⚠️</span>
                                <span className="text-xl font-semibold text-white">
                                    {lowBatteryCount} Low Battery
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Navigation Tabs */}
                <div className="mb-6">
                    <nav className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-lg p-3 rounded-xl shadow-xl border border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'text-white/90 hover:bg-white/10 hover:transform hover:scale-105'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <main className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/10">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">
                                {tabs.find(tab => tab.id === activeTab)?.icon}
                            </span>
                            <h2 className="text-2xl font-bold text-white">
                                {tabs.find(tab => tab.id === activeTab)?.label}
                            </h2>
                        </div>
                        <div className="bg-white/95 backdrop-blur-lg rounded-lg p-6 shadow-inner">
                            {renderContent()}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-8 text-center">
                    <p className="text-blue-200 text-sm">
                        © 2024 EV Fleet Management System by @Teuton-Roy
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Dashboard;