import React from 'react';
import { Battery, Clock, TrendingUp } from 'lucide-react';

function FleetDashboard({ vehicles, onVehicleSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map(vehicle => (
        <div
          key={vehicle.id}
          className={`p-4 rounded-lg border ${
            vehicle.battery < 15 ? 'border-red-500 border-2' : 'border-gray-200'
          } cursor-pointer hover:shadow-lg transition-shadow`}
          onClick={() => onVehicleSelect(vehicle)}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Vehicle {vehicle.id}</h3>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                vehicle.status === 'In Transit'
                  ? 'bg-blue-100 text-blue-800'
                  : vehicle.status === 'Charging'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {vehicle.status}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    vehicle.battery < 15
                      ? 'bg-red-600'
                      : vehicle.battery < 30
                      ? 'bg-yellow-400'
                      : 'bg-green-600'
                  }`}
                  style={{ width: `${vehicle.battery}% `}}
                />
              </div>
              <span>{vehicle.battery}%</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Distance: {vehicle.distance}km</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last Charged: {new Date(vehicle.lastChargeTime).toLocaleString()}</span>
            </div>

            {vehicle.scheduledCharge && (
              <div className="text-sm text-gray-500">
                Scheduled Charge: {new Date(vehicle.scheduledCharge).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FleetDashboard;