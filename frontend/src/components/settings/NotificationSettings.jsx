import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch.jsx';

export default function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [rent, setRent] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-4 max-w-2xl divide-y divide-slate-50">
      <ToggleSwitch 
        label="Email Notifications" 
        description="Receive summary reports and critical alerts via email."
        checked={email}
        onChange={setEmail}
      />
      <ToggleSwitch 
        label="Rent Reminders" 
        description="Auto-send reminders to tenants 3 days before due date."
        checked={rent}
        onChange={setRent}
      />
      <ToggleSwitch 
        label="Maintenance Alerts" 
        description="Get instant notifications for new urgent support tickets."
        checked={maintenance}
        onChange={setMaintenance}
      />
    </div>
  );
}
