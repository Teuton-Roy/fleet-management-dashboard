import { useEffect } from 'react';

function VehicleStatusUpdater({ vehicles, updateVehicle }) {
  useEffect(() => {
    const interval = setInterval(() => {
      vehicles.forEach(vehicle => {
        let updatedVehicle = { ...vehicle };
        
        if (vehicle.status === 'In Transit' && vehicle.battery > 0) {
          // Battery consumption: 1% per 3km
          const distanceIncrement = 3;
          const batteryDecrement = 1;
          
          updatedVehicle.distance += distanceIncrement;
          updatedVehicle.battery = Math.max(0, vehicle.battery - batteryDecrement);
        } else if (vehicle.status === 'Charging' && vehicle.battery < 100) {
          // Charging: 10% every 10 minutes
          const chargingIncrement = 10;
          updatedVehicle.battery = Math.min(100, vehicle.battery + chargingIncrement);
          
          if (updatedVehicle.battery === 100) {
            updatedVehicle.lastChargeTime = new Date().toISOString();
            updatedVehicle.status = 'Idle';
          }
        }
        
        if (updatedVehicle.battery !== vehicle.battery || 
            updatedVehicle.status !== vehicle.status || 
            updatedVehicle.distance !== vehicle.distance) {
          updateVehicle(updatedVehicle);
        }
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [vehicles, updateVehicle]);

  return null;
}

export default VehicleStatusUpdater;