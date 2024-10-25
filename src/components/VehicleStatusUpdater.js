import { useEffect } from 'react';

function VehicleStatusUpdater({ vehicles, updateVehicle }) {
  useEffect(() => {
    const interval = setInterval(() => {
      vehicles.forEach(vehicle => {
        if (vehicle.status === 'In Transit' && vehicle.battery > 0) {
          updateVehicle({ ...vehicle, battery: vehicle.battery - 1 });
        } else if (vehicle.status === 'Charging' && vehicle.battery < 100) {
          updateVehicle({ ...vehicle, battery: vehicle.battery + 10 });
        }
      });
    }, 10000); // Runs every 10 seconds

    return () => clearInterval(interval);
  }, [vehicles, updateVehicle]);

  return null;
}

export default VehicleStatusUpdater;