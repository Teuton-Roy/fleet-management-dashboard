import { useState } from 'react';

function VehicleForm({ onSubmit, initialData }) {
  const [vehicle, setVehicle] = useState(initialData || {
    id: '',
    battery: 100,
    distance: 0,
    lastChargeTime: '',
    status: 'Idle'
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehicle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" placeholder="Vehicle ID" value={vehicle.id} onChange={handleChange} required />
      <input type="number" name="battery" placeholder="Battery %" value={vehicle.battery} onChange={handleChange} />
      <input type="number" name="distance" placeholder="Distance travelled (km)" value={vehicle.distance} onChange={handleChange} />
      <input type="datetime-local" name="lastChargeTime" placeholder="Last Charge Time" value={vehicle.lastChargeTime} onChange={handleChange} />
      <select name="status" value={vehicle.status} onChange={handleChange}>
        <option value="In Transit">In Transit</option>
        <option value="Charging">Charging</option>
        <option value="Idle">Idle</option>
      </select>
      <button type="submit">Save Vehicle</button>
    </form>
  );
}

export default VehicleForm;