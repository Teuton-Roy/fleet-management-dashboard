import React, { useState } from 'react';
import { Clock } from 'lucide-react';

function ChargingScheduler({ vehicles, onScheduleCharging }) {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVehicle && scheduleTime) {
      onScheduleCharging(selectedVehicle, new Date(scheduleTime).toISOString());
      setSelectedVehicle('');
      setScheduleTime('');
    }
  };

  // Filter out vehicles that are already charging
  const availableVehicles = vehicles.filter(v => v.status !== 'Charging');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Schedule Charging
        <Clock className="inline-block ml-2 h-5 w-5" />
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Vehicle</label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choose a vehicle...</option>
            {availableVehicles.map(vehicle => (
              <option 
                key={vehicle.id} 
                value={vehicle.id}
                disabled={vehicle.battery >= 95}
              >
                Vehicle {vehicle.id} - Battery: {vehicle.battery}%
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Schedule Time</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>

        {selectedVehicle && vehicles.find(v => v.id === selectedVehicle)?.battery >= 95 && (
          <div className="text-yellow-600 text-sm">
            Note: This vehicle's battery is already at or above 95%
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!selectedVehicle || !scheduleTime}
          >
            Schedule Charging
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedVehicle('');
              setScheduleTime('');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
        </div>

        {/* Display currently scheduled charges */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Scheduled Charges</h3>
          <div className="space-y-2">
            {vehicles
              .filter(v => v.scheduledCharge)
              .map(vehicle => (
                <div
                  key={vehicle.id}
                  className="p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <p className="font-medium">Vehicle {vehicle.id}</p>
                  <p className="text-sm text-gray-600">
                    Scheduled for: {new Date(vehicle.scheduledCharge).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Current Battery: {vehicle.battery}%
                  </p>
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChargingScheduler;