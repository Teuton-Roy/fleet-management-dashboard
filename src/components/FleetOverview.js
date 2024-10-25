import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

function FleetOverview({ vehicles, averageBattery, lowBatteryCount }) {
  const statusCounts = {
    inTransit: vehicles.filter(v => v.status === 'In Transit').length,
    charging: vehicles.filter(v => v.status === 'Charging').length,
    idle: vehicles.filter(v => v.status === 'Idle').length
  };

  // Sample data for the battery trend chart
  const batteryTrendData = [
    { time: '1h ago', battery: averageBattery + 5 },
    { time: '30m ago', battery: averageBattery + 2 },
    { time: 'Now', battery: averageBattery }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Fleet Statistics</h2>
        <div className="space-y-2">
          <p>Total Vehicles: {vehicles.length}</p>
          <p>In Transit: {statusCounts.inTransit}</p>
          <p>Charging: {statusCounts.charging}</p>
          <p>Idle: {statusCounts.idle}</p>
          <p>Average Battery: {averageBattery.toFixed(1)}%</p>
          <p>Low Battery Vehicles: {lowBatteryCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Battery Trend</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={batteryTrendData}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="battery" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FleetOverview;