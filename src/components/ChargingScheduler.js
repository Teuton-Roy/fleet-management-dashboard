import React, { useState, useEffect } from 'react'; 
import { getVehicles, addOrUpdateVehicle } from '../Utility/vehicleData'; // Named imports

function ChargingScheduler() { 
    const [selectedVehicle, setSelectedVehicle] = useState(''); 
    const [scheduleTime, setScheduleTime] = useState(''); 
    const [vehicles, setVehicles] = useState([]); 
    const [chargingStatus, setChargingStatus] = useState({}); 

    // Load vehicle data on component mount 
    useEffect(() => { 
        const fetchedVehicles = getVehicles(); // Use named import
        setVehicles(fetchedVehicles); 
    }, []); 

    // Handle the scheduling logic 
    const handleSchedule = () => { 
        if (!selectedVehicle || !scheduleTime) { 
            alert('Please select a vehicle and schedule a time.'); 
            return; 
        } 
        
        // Convert scheduleTime to a Date object 
        const scheduleDate = new Date(scheduleTime); 
        const currentDate = new Date(); 

        // Check if scheduled time is in the future 
        if (scheduleDate <= currentDate) { 
            alert('Please choose a future time for charging.'); 
            return; 
        } 

        // Update charging status to "Scheduled" 
        setChargingStatus((prevState) => ({ 
            ...prevState, 
            [selectedVehicle]: { 
                status: 'Scheduled', 
                time: scheduleDate 
            }, 
        })); 
        alert(`Charging scheduled for vehicle ${selectedVehicle} at ${scheduleDate.toLocaleString()}`); 
    }; 

    // Simulate charging start when the scheduled time arrives 
    useEffect(() => { 
        const interval = setInterval(() => { 
            const now = new Date(); 
            vehicles.forEach((vehicle) => { 
                const chargingData = chargingStatus[vehicle.id]; 
                if (chargingData && chargingData.status === 'Scheduled' && now >= chargingData.time) { 
                    // Update vehicle status to 'Charging' once the schedule time is reached 
                    setChargingStatus((prevState) => ({ 
                        ...prevState, 
                        [vehicle.id]: { 
                            status: 'Charging', 
                            time: now 
                        }, 
                    })); 
                    addOrUpdateVehicle(vehicle.id, 'Charging'); // Use named import
                } 
            }); 
        }, 1000); // Check every second 
        return () => clearInterval(interval); 
    }, [chargingStatus, vehicles]); 

    return ( 
        <div>
            <h1>Schedule Vehicle Charging</h1>

            {/* Vehicle Selection */} 
            <select onChange={(e) => setSelectedVehicle(e.target.value)} className="p-2 border rounded-md w-full">
                <option value="">-- Select a Vehicle --</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.id} - {vehicle.status}</option>
                ))}
            </select> 

            {/* Schedule Time */} 
            <input 
                type="datetime-local" 
                onChange={(e) => setScheduleTime(e.target.value)} 
                className="p-2 border rounded-md w-full" 
            /> 

            {/* Submit Button */} 
            <button onClick={handleSchedule} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Schedule Charging</button> 

            {/* Charging Status */} 
            {selectedVehicle && chargingStatus[selectedVehicle] && ( 
                <div>
                    <h2>Current Status:</h2> 
                    <p>{chargingStatus[selectedVehicle].status}</p>
                    {chargingStatus[selectedVehicle].status === 'Scheduled' && ( 
                        <p>Scheduled for: {chargingStatus[selectedVehicle].time.toLocaleString()}</p>
                    )} 
                </div>
            )} 
        </div>
    ); 
} 

export default ChargingScheduler;
