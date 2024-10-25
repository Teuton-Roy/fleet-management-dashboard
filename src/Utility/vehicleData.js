// Key for local storage
const STORAGE_KEY = 'vehicles';

// Retrieve the vehicle data from local storage
export const getVehicles = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save the vehicle data to local storage
export const saveVehicles = (vehicles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};

// Add a new vehicle or update an existing vehicle by ID
export const addOrUpdateVehicle = (vehicle) => {
  const vehicles = getVehicles();
  const existingIndex = vehicles.findIndex((v) => v.id === vehicle.id);
  if (existingIndex >= 0) {
    vehicles[existingIndex] = vehicle; // Update the existing vehicle
  } else {
    vehicles.push(vehicle); // Add the new vehicle
  }
  saveVehicles(vehicles);
};

// Remove a vehicle by ID
export const removeVehicle = (vehicleId) => {
  const vehicles = getVehicles().filter((vehicle) => vehicle.id !== vehicleId);
  saveVehicles(vehicles);
};

// Find a vehicle by ID
export const findVehicleById = (vehicleId) => {
  const vehicles = getVehicles();
  return vehicles.find((vehicle) => vehicle.id === vehicleId);
};

// Get the average battery percentage across all vehicles
export const getAverageBattery = () => {
  const vehicles = getVehicles();
  const totalBattery = vehicles.reduce((sum, vehicle) => sum + vehicle.battery, 0);
  return vehicles.length > 0 ? totalBattery / vehicles.length : 0;
};

// Get the number of vehicles with battery below a specific percentage (e.g., 20%)
export const getLowBatteryCount = (threshold = 20) => {
  const vehicles = getVehicles();
  return vehicles.filter((vehicle) => vehicle.battery < threshold).length;
};