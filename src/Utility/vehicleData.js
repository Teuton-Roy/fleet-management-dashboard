const STORAGE_KEY = 'fleet_vehicles';

export const getVehicles = () => {
  const vehicles = localStorage.getItem(STORAGE_KEY);
  return vehicles ? JSON.parse(vehicles) : [];
};

export const addOrUpdateVehicle = (vehicle) => {
  const vehicles = getVehicles();
  const index = vehicles.findIndex(v => v.id === vehicle.id);
  
  if (index >= 0) {
    vehicles[index] = vehicle;
  } else {
    vehicles.push(vehicle);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};

export const getAverageBattery = () => {
  const vehicles = getVehicles();
  if (vehicles.length === 0) return 0;
  return vehicles.reduce((sum, v) => sum + v.battery, 0) / vehicles.length;
};

export const getLowBatteryCount = () => {
  const vehicles = getVehicles();
  return vehicles.filter(v => v.battery < 15).length;
};