import React, { useState } from 'react';

function VehicleForm({ onSubmit, initialData, onCancel }) {
  const [vehicle, setVehicle] = useState(initialData || {
    id: '',
    battery: 100,
    distance: 0,
    lastChargeTime: new Date().toISOString(),
    status: 'Idle',
    scheduledCharge: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle(prev => ({
      ...prev,
      [name]: name === 'battery' || name === 'distance' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehicle);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Vehicle ID</label>
        <input
          type="text"
          name="id"
          value={vehicle.id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          disabled={initialData}
        />
      </div>

      <div>
        <label className="block mb-1">Battery Level (%)</label>
        <input
          type="number"
          name="battery"
          value={vehicle.battery}
          onChange={handleChange}
          min="0"
          max="100"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Distance (km)</label>
        <input
          type="number"
          name="distance"
          value={vehicle.distance}
          onChange={handleChange}
          min="0"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={vehicle.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Idle">Idle</option>
          <option value="In Transit">In Transit</option>
          <option value="Charging">Charging</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {initialData ? 'Update' : 'Add'} Vehicle
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default VehicleForm;